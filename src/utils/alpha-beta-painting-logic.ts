import {AlphaBetaNode} from "./data-structures";
import {setInfoModal, setModal} from "./store/utils-store/utils-actions";
import {useDispatch} from "react-redux";
import {getSettings} from "./general-logic";
import {runningAlphaBeta} from "./alpha-beta-logic";

const settings = getSettings()

export enum colors {
    highlight = 'red',
    regular = 'black',
    white = 'white',
    comparison = 'green'
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

const euclideanDistance = (node1: AlphaBetaNode, node2: AlphaBetaNode) => {
    const x1 = node1.coordinates.x
    const y1 = node1.coordinates.y
    const x2 = node2.coordinates.x
    const y2 = node2.coordinates.y
    return (y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)
}

const computeAllNodes = (root: AlphaBetaNode, candidates: AlphaBetaNode[], condition = (child: AlphaBetaNode) => true) => {

    for(let child of root.children)
        if(condition(child)) {
            candidates.push(child)
            computeAllNodes(child, candidates, condition)
        }
}

const computeFather = (node: AlphaBetaNode, root: AlphaBetaNode) => {
    const candidates: AlphaBetaNode[] = [root]
    // Get me the candidates for the fathers. They are only the nodes that are above my current one.
    computeAllNodes(root, candidates, (child: AlphaBetaNode) => child.coordinates.y < node.coordinates.y - NODE_RADIUS * 2)

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

const checkForCollision = (x: number, y: number, root: AlphaBetaNode) => {
    const nodes = [root]
    computeAllNodes(root, nodes)

    const dummyNode = new AlphaBetaNode(undefined, null, {
        x, y
    })

    for(let node of nodes)
        if(euclideanDistance(dummyNode, node) <= NODE_RADIUS * NODE_RADIUS)
            return node

    return null
}

export const setAlphaBetaNodeValue = (node: AlphaBetaNode, value: number) => {
    node.value = value
    ctx.font = '30px Serif'
    ctx.textAlign = 'center'
    ctx.fillText(value.toString(), node.coordinates.x, node.coordinates.y + 50, 200)
}

export const useAlphaBetaPaintingModule = () => {
    const dispatch = useDispatch()
    return async (root: AlphaBetaNode) => {
        canvas = document.querySelector('#canvas')! as HTMLCanvasElement
        ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)

        const boundBox = canvas.getBoundingClientRect()

        let prevCollidedNode: AlphaBetaNode | null = null
        let collidedNode: AlphaBetaNode | null = null
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
            if(runningAlphaBeta)
                return;
            const x = event.clientX - boundBox.left
            const y = event.clientY - boundBox.top

            const collidedNode = checkForCollision(x, y, root)
            if (collidedNode) {
                // Check if it is the root!
                if(collidedNode == root)
                    return;
                // Check if it is a leaf!
                if(!collidedNode.leaf)
                    return;
                // Now it is a leaf for sure!
                highlightAlphaBetaNode(collidedNode)
                dispatch(setModal({
                    opened: true,
                    type: 'input',
                    content: collidedNode
                }))
                // setNodeValue(collidedNode, collidedNode.value!)
                return;
            }

            const dummyNode = new AlphaBetaNode(undefined, null, {x, y})

            const father = computeFather(dummyNode, root)

            const newNode = new AlphaBetaNode(undefined, father, {x, y})

            newNode.father!.children.push(newNode)

            await paintAlphaBetaNode(newNode, colors.regular, NODE_RADIUS)
        })

        await paintTree(root)
    }

}


const paintTree = async (root: AlphaBetaNode) => {
    await paintAlphaBetaNode(root, colors.regular, NODE_RADIUS)
    for(let child of root.children)
        await paintTree(child)
}

const drawCircle = (centerX: number, centerY: number, NODE_RADIUS: number, drawAngle: number = 0) => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    // ctx.moveTo(drawX, drawY)
    ctx.arc(centerX, centerY, NODE_RADIUS, 0, drawAngle)
    ctx.stroke()

    drawAngle += settings.draw_speed
    if(drawAngle < 2 * Math.PI)
        requestAnimationFrame(() => drawCircle(centerX , centerY, NODE_RADIUS, drawAngle))
}

const drawLine = (x: number, y: number) => {
    // ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.stroke()
}
export const paintAlphaBetaNode = async (node: AlphaBetaNode, color: colors, NODE_RADIUS: number) => {
    const {x, y} = node.coordinates
    // Make the circle
    ctx.beginPath()
    ctx.strokeStyle = color
    // color === colors.highlight ? ctx.lineWidth = 8 : ctx.lineWidth = 1
    // ctx.moveTo(x + NODE_RADIUS, y)
    // ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI)

    drawCircle(x, y, NODE_RADIUS)

    // ctx.stroke()
    // ctx.fill()

//     Connect it to its father
//     drawLine()
    ctx.moveTo(x, y)
    if(color === colors.comparison)
        ctx.lineWidth = 3
    else
        ctx.lineWidth = 1
    drawLine(node.father?.coordinates.x as number, node.father?.coordinates.y as number)
    ctx.lineWidth = 1
}

export const highlightAlphaBetaNode = async (node: AlphaBetaNode, color?: colors) => {
    node.highlighted = true
    const coordinates = node.coordinates
    const {x, y} = coordinates

    await paintAlphaBetaNode(node, color ? color : colors.highlight, NODE_RADIUS)
    // Double the current node!
    await paintAlphaBetaNode(node, color ? color : colors.highlight, NODE_RADIUS + 5)

    await waitOnPainting(settings.delay)

    if(color === colors.comparison)
        return;

    await paintAlphaBetaNode(node, colors.white, NODE_RADIUS + 5)

    await paintAlphaBetaNode(node, color ? color : colors.regular, NODE_RADIUS)



    node.highlighted = false
}