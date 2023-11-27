import {Node} from "./data-structures";
import {setModal} from "./store/utils-store/utils-actions";
import {useDispatch} from "react-redux";

const TIMEOUT_BETWEEN_HIGHLIGHTS = 2000

enum colors {
    highlight = 'red',
    regular = 'black'
}
export const canvasDimensions = {
    width: 500,
    height: 500
}

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
                console.log(collidedNode)
        })


        canvas.addEventListener('click', async (event) => {
            const x = event.clientX - boundBox.left
            const y = event.clientY - boundBox.top

            const collidedNode = checkForCollision(x, y, root)
            if (collidedNode) {
                highlightNode(collidedNode)
                // TODO: Open modal for input into the node

                dispatch(setModal({
                    opened: true,
                    type: 'input',
                    content: collidedNode
                }))
                // setNodeValue(collidedNode, collidedNode.value!)
                return;
            }

            const newNode = new Node(undefined, null, {x, y})

            newNode.father = computeFather(newNode, root)
            newNode.father.children.push(newNode)

            await paintNode(newNode, colors.regular)
        })

        await paintTree(root)
    }
}


const paintTree = async (root: Node) => {
    await paintNode(root, colors.regular)
    for(let child of root.children)
        await paintTree(child)
}
export const paintNode = async (node: Node, color: colors) => {
    const {x, y} = node.coordinates
    // Make the circle
    ctx.beginPath()
    ctx.strokeStyle = color
    // color === colors.highlight ? ctx.lineWidth = 8 : ctx.lineWidth = 1
    ctx.moveTo(x, y)
    ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI)
    ctx.stroke()
    // ctx.fill()

//     Connect it to its father
    ctx.moveTo(x, y)
    ctx.lineWidth = 1
    ctx.lineTo(node.father?.coordinates.x as number, node.father?.coordinates.y as number)
    ctx.stroke()
}

export const highlightNode = async (node: Node) => {
    node.highlighted = true
    const coordinates = node.coordinates
    const {x, y} = coordinates

    await paintNode(node, colors.highlight)

    await waitOnPainting(TIMEOUT_BETWEEN_HIGHLIGHTS)

    await paintNode(node, colors.regular)
    node.highlighted = false
}