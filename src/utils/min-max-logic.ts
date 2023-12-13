// The logic for the MinMax algorithm.

import {levels, Node} from "./data-structures";
import {read} from "fs";
import {canvasDimensions, colors, highlightNode, paintNode, setNodeValue, usePaintingModule} from "./painting-logic";
import {useDispatch, useSelector} from "react-redux";
import {setModal} from "./store/utils-store/utils-actions";
import {getModal} from "./store/utils-store/utils-selectors";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {inspect} from "util";




const createDummyTree = (root: Node) => {
    root.children.push(new Node(undefined, root, {x: canvasDimensions.width / 2, y: 50}))
    root.children.push(new Node(undefined, root, {x: 150, y: 20}))

    root.children[0].children.push(new Node(1, root.children[0],{x: 20, y: 40}))
    root.children[0].children.push(new Node(0, root.children[0], {x: 40, y: 40}))

    root.children[1].children.push(new Node(4, root.children[1], {x: 140, y: 40}))
    root.children[1].children.push(new Node(8, root.children[1], {x: 160, y: 40}))
}

export const useMinMaxAlgo = () => {
    const initPaintingModule = usePaintingModule()
    const dispatch = useDispatch()
    const modal = useSelector(getModal)

    return async () => {
        const root = new Node()
        // createDummyTree(root)
        await initPaintingModule(root)

        // await solveMinMax(root)
        // One last time for the root we decide on the value (max level)

        return root
    }
}


export const solveMinMaxFront = async (root: Node, setInfoCallback: Dispatch<SetStateAction<string>>) => {
    await solveMinMax(root, setInfoCallback)
    const [decision, _] = await getDecision(root, setInfoCallback)
    setNodeValue(root, decision)
}

export const solveMinMax = async (node: Node, setInfoCallback: Dispatch<SetStateAction<string>>) =>{
    // Highlight the current node
    await highlightNode(node)
    // console.log('a', node)
    const ready = await readyToDecide(node, setInfoCallback)
    if(ready) {
        const [decision, target] = await getDecision(node, setInfoCallback)
        await highlightNode(node, colors.comparison)
        await highlightNode(target, colors.comparison)
        setNodeValue(node, decision)
    }
    // Traverse all children from left to right.
    if(!ready)
        for(let i = 0 ; i < node.children.length; i++) {
            const child = node.children[i]
            await solveMinMax(child, setInfoCallback)
        }
    // Verify AGAIN! as some children have been modified!!!
    // GUARD
    if(node.value)
        return;

    const ready2 = await readyToDecide(node, setInfoCallback)

    if(ready2) {
        const [decision2, _] = await getDecision(node, setInfoCallback)
        await highlightNode(node)
        setNodeValue(node, decision2)
        await highlightNode(node, colors.comparison)
        // await highlightNode(target2, colors.comparison)
    }
}

const readyToDecide = async (node: Node, setInfoCallback: Dispatch<SetStateAction<string>>): Promise<boolean> => {
    let ready = true

    // Traverse all children from left to right.
    for(let child of node.children) {
        // await highlightNode(child)
        // All children must have filled in values.
        if (child.value === undefined) {
            ready = false
            break
        }
    }
    return ready
}

const getDecision = async (node: Node, setInfoCallback: Dispatch<SetStateAction<string>>): Promise<[number, Node]> => {
    let decision: number
    let target: Node = new Node()

    if(node.level === levels.min)
        decision = Infinity
    else
        decision = -Infinity

    // Traverse all children from left to right.
    for(let child of node.children) {
        await highlightNode(child)

        setInfoCallback(`${child.value} ? ${decision}`)
        await highlightNode(child, colors.comparison)
        //    Compute the decision itself.
        if(node.level === levels.min) {
            if (child.value! < decision) {
                target = child
                decision = child.value!
            }
        }
        else
        if (child.value! > decision) {
            target = child
            decision = child.value!
        }

    }
    return [decision, target]
}



