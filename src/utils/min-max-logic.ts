// The logic for the MinMax algorithm.

import {levels, Node} from "./data-structures";
import {read} from "fs";
import {canvasDimensions, highlightNode, initPaintingModule, paintNode, setNodeValue} from "./painting-logic";


const createDummyTree = (root: Node) => {
    root.children.push(new Node(undefined, root, {x: canvasDimensions.width / 2, y: 50}))
    root.children.push(new Node(undefined, root, {x: 150, y: 20}))

    root.children[0].children.push(new Node(1, root.children[0],{x: 20, y: 40}))
    root.children[0].children.push(new Node(0, root.children[0], {x: 40, y: 40}))

    root.children[1].children.push(new Node(4, root.children[1], {x: 140, y: 40}))
    root.children[1].children.push(new Node(8, root.children[1], {x: 160, y: 40}))
}

export const initAlgo = async () => {
    const root = new Node()
    // createDummyTree(root)
    await initPaintingModule(root)



    // await solveMinMax(root)
    // One last time for the root we decide on the value (max level)

    return root
}

export const solveMinMaxFront = async (root: Node) => {
    await solveMinMax(root)
    const [_, decision] = readyToDecide(root)
    setNodeValue(root, decision)
}

export const solveMinMax = async (node: Node) =>{
    // Highlight the current node
    await highlightNode(node)
    // Traverse all children from left to right.
    for(let i = 0 ; i < node.children.length; i++) {
        const child = node.children[i]
        const [ready, decision] = readyToDecide(node)
        if(ready)
            setNodeValue(node, decision)
        // If I could node decide on the value, I go down more.
        if(!ready)
            await solveMinMax(child)
    }
}

const readyToDecide = (node: Node): [boolean, number] => {
    let ready = true
    let decision: number

    if(node.level === levels.min)
        decision = Infinity
    else
        decision = -Infinity

    // Traverse all children from left to right.
    for(let child of node.children) {
        // All children must have filled in values.
        if (child.value === undefined) {
            ready = false
            break
        }
    //     Also compute the decision itself while we are at it.
        if(node.level === levels.min) {
            if (child.value < decision)
                decision = child.value
        }
        else
            if (child.value > decision)
                decision = child.value

    }
    return [ready, decision]
}



