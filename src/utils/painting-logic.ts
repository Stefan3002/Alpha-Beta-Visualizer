import {AlphaBetaNode, Node} from "./data-structures";
import {setErrorModal, setInfoModal, setModal} from "./store/utils-store/utils-actions";
import {useDispatch} from "react-redux";
import {getSettings} from "./general-logic";
import {canvasDimensions, colors, drawCircle, drawLine} from './painting-general-logic'
import {running} from "./min-max-logic";

const settings = getSettings()



const NODE_RADIUS = 20
const MARGIN = 5
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D


export const waitOnPainting = (time: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve()
        }, time)
    })
}

const euclideanDistance = (node1: Node, node2: Node) => {
    const x1 = node1.coordinates.x
    const y1 = node1.coordinates.y
    const x2 = node2.coordinates.x
    const y2 = node2.coordinates.y
    return (y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)
}

const computeAllNodes = (root: Node, candidates: Node[], condition = (child: Node) => true) => {

    for(let child of root.children)
        if(condition(child)) {
            candidates.push(child)
            computeAllNodes(child, candidates, condition)
        }
}

const computeFather = (node: Node, root: Node) => {
    const candidates: Node[] = [root]
    // Get me the candidates for the fathers. They are only the nodes that are above my current one.
    computeAllNodes(root, candidates, (child: Node) => child.coordinates.y < node.coordinates.y - NODE_RADIUS * 2)

    candidates.sort((candidate1, candidate2) => {
        const dist1 = euclideanDistance(candidate1, node)
        const dist2 = euclideanDistance(candidate2, node)

        if(dist1 < dist2)
            return -1
        else if(dist1 > dist2)
            return 1
        else
            return 0
    })

    return candidates[0]
}

const checkForCollision = (x: number, y: number, root: Node) => {
    const nodes = [root]
    computeAllNodes(root, nodes)

    const dummyNode = new Node(undefined, null, {
        x, y
    })

    for(let node of nodes)
        if(euclideanDistance(dummyNode, node) <= NODE_RADIUS * NODE_RADIUS)
            return node

    return null
}

export const setNodeValue = (node: Node, value: number) => {
    node.value = value
    ctx.font = '30px Serif'
    ctx.textAlign = 'center'
    ctx.fillText(value.toString(), node.coordinates.x, node.coordinates.y + 50, 200)
}

export const usePaintingModule = () => {
    const dispatch = useDispatch()
    return async (root: Node) => {
        canvas = document.querySelector('#canvas')! as HTMLCanvasElement
        ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)

        const boundBox = canvas.getBoundingClientRect()

        let prevCollidedNode: Node | null = null
        let collidedNode: Node | null = null
        canvas.addEventListener('mousemove', (event) => {
            const x = event.clientX - boundBox.left
            const y = event.clientY - boundBox.top

            // Check if mouse hover over a node, but do not get the collision warning a million times, just once (maybe twice :))
            if (!prevCollidedNode && checkForCollision(x, y, root))
                prevCollidedNode = checkForCollision(x, y, root)
            else if (checkForCollision(x, y, root)) {
                prevCollidedNode = collidedNode
                collidedNode = checkForCollision(x, y, root)
            }


            if (collidedNode !== prevCollidedNode)
                dispatch(setInfoModal({
                    opened: true,
                    content: collidedNode!
                }))
        })


        canvas.addEventListener('click', async (event) => {
            if(running)
                return;

            const x = event.clientX - boundBox.left
            const y = event.clientY - boundBox.top

            const collidedNode = checkForCollision(x, y, root)

            if (collidedNode) {
                // Check if it is the root!
                if(collidedNode == root) {
                    dispatch(setErrorModal({
                        opened: true,
                        content: 'You can not set a value for the root.'
                    }))
                    return;
                }
                // Check if it is a leaf!
                if(!collidedNode.leaf) {
                    dispatch(setErrorModal({
                        opened: true,
                        content: 'You can not set a value for a node that is not a leaf.'
                    }))
                    return;
                }
                // Now it is a leaf for sure!
                highlightNode(collidedNode)
                dispatch(setModal({
                    opened: true,
                    type: 'input',
                    content: collidedNode
                }))
                // setNodeValue(collidedNode, collidedNode.value!)
                return;
            }

            const dummyNode = new Node(undefined, null, {x, y})

            const father = computeFather(dummyNode, root)


            // TODO: Check if the father had a set value
            // The user should not be able to add a leaf after a node
            // with a set value!

            // if(father.value !== undefined)
            //     return;

            const newNode = new Node(undefined, father, {x, y})

            newNode.father!.children.push(newNode)

            await paintNode(newNode, colors.regular, NODE_RADIUS)
        })

        await paintTree(root)
    }

}


const paintTree = async (root: Node | AlphaBetaNode) => {
    await paintNode(root, colors.regular, NODE_RADIUS)
    for(let child of root.children)
        await paintTree(child)
}

export const paintNode = async (node: Node, color: colors, NODE_RADIUS: number) => {
    const {x, y} = node.coordinates
    // Make the circle
    ctx.beginPath()
    ctx.strokeStyle = color
    // color === colors.highlight ? ctx.lineWidth = 8 : ctx.lineWidth = 1
    // ctx.moveTo(x + NODE_RADIUS, y)
    // ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI)

    drawCircle(ctx, x, y, NODE_RADIUS)

    // ctx.stroke()
    // ctx.fill()

//     Connect it to its father
//     drawLine()
    ctx.moveTo(x, y)
    if(color === colors.comparison)
        ctx.lineWidth = 3
    else
        ctx.lineWidth = 1
    drawLine(ctx, node.father?.coordinates.x as number, node.father?.coordinates.y as number)
    ctx.lineWidth = 1
}

export const highlightNode = async (node: Node, color?: colors) => {
    node.highlighted = true
    const coordinates = node.coordinates
    const {x, y} = coordinates

    await paintNode(node, color ? color : colors.highlight, NODE_RADIUS)
    // Double the current node!
    await paintNode(node, color ? color : colors.highlight, NODE_RADIUS + 5)

    await waitOnPainting(settings.delay)

    if(color === colors.comparison)
        return;

    await paintNode(node, colors.white, NODE_RADIUS + 5)

    await paintNode(node, color ? color : colors.regular, NODE_RADIUS)



    node.highlighted = false
}