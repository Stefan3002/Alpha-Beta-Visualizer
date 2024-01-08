// The logic for the MinMax algorithm.

import {errorType, levels, Node, stepDataType} from "./data-structures";
import {canvasDimensions, colors, highlightNode, setNodeValue, usePaintingModule} from "./painting-logic";
import {useDispatch, useSelector} from "react-redux";
import {getModal} from "./store/utils-store/utils-selectors";
import {Dispatch, SetStateAction} from "react";
import {getSettings, waitOnUser} from "./general-logic";

const SETTINGS = getSettings()

export let running = false


const createDummyTree = (root: Node) => {
    root.children.push(new Node(undefined, root, {x: canvasDimensions.width / 2, y: 50}))
    root.children.push(new Node(undefined, root, {x: 150, y: 20}))

    root.children[0].children.push(new Node(1, root.children[0],{x: 20, y: 40}))
    root.children[0].children.push(new Node(0, root.children[0], {x: 40, y: 40}))

    root.children[1].children.push(new Node(4, root.children[1], {x: 140, y: 40}))
    root.children[1].children.push(new Node(8, root.children[1], {x: 160, y: 40}))
}

const checkLeavesValidity = (root: Node): boolean => {
    if(_checkLeavesValidityAux(root) === undefined)
        return true
    else
        return false
}
const _checkLeavesValidityAux = (root: Node): boolean | undefined => {
    for(let node of root.children)
        if(node.leaf) {
            if (node.value === undefined)
                return false;
        }
        else
            _checkLeavesValidityAux(node)
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


export const solveMinMaxFront = async (root: Node, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setErrorCallback: Dispatch<SetStateAction<errorType>>) => {
    // Check to see if you are good to go
    // Maybe there are leafs with no value
    if(!checkLeavesValidity(root)){
        setErrorCallback('There are leaves with no value set.')
        return;
    }
    // Maybe there is only the root in place
    if(root.children.length === 0){
        setErrorCallback('There are no nodes created.')
        return;
    }

    running = true
    await solveMinMax(root, setInfoCallback, setErrorCallback)
    const [decision, _] = await getDecision(root, setInfoCallback)
    setNodeValue(root, decision)
}

export const solveMinMax = async (node: Node, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setErrorCallback: Dispatch<SetStateAction<errorType>>) =>{
    // Highlight the current node
    await highlightNode(node)
    const ready = await readyToDecide(node)
    if(ready) {
        const [decision, target] = await getDecision(node, setInfoCallback)
        await highlightNode(node, colors.comparison)
        await highlightNode(target, colors.comparison)
        setNodeValue(node, decision)
        if(SETTINGS.waitOnUser)
            await waitOnUser()
        return;
    }
    // Traverse all children from left to right.
    if(!ready)
        for(let i = 0 ; i < node.children.length; i++) {
            const child = node.children[i]
            await solveMinMax(child, setInfoCallback, setErrorCallback)
            // Maybe now all the children have a set value
            // break if so, no need to go to children with set values
            if(await readyToDecide(node))
                break
        }
    // Verify AGAIN! as some children have been modified!!!
    // GUARD
    if(node.value !== undefined)
        return;

    const ready2 = await readyToDecide(node)

    if(ready2) {
        const [decision2, _] = await getDecision(node, setInfoCallback)
        await highlightNode(node)
        setNodeValue(node, decision2)
        await highlightNode(node, colors.comparison)
        if(SETTINGS.waitOnUser)
            await waitOnUser()

        // await highlightNode(target2, colors.comparison)
    }
}

const readyToDecide = async (node: Node): Promise<boolean> => {
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

const getDecision = async (node: Node, setInfoCallback: Dispatch<SetStateAction<stepDataType>>): Promise<[number, Node]> => {
    let decision: number
    let target: Node = new Node()

    if(node.level === levels.min)
        decision = Infinity
    else
        decision = -Infinity

    // Traverse all children from left to right.
    for(let child of node.children) {
        // await highlightNode(child)
        await highlightNode(child, colors.comparison)
        setInfoCallback({
            value: `${child.value} ? ${node.value}`,
            level: node.level,
            father: node,
            node: child
        })
        if(SETTINGS.waitOnUser)
            await waitOnUser()
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
    //     To keep the algo correct (VERY correct, text-book correct)
    //     you would actually compare the node with his children one by one
    //     and take any intermediary value that is bigger / smaller than the current node value
    //     not do max / min for the children
    //     so we will put the intermediary value in the father (current node)

        if(node.value === undefined)
            node.value = decision
        else
            if(node.level === levels.min) {
                if (decision < node.value)
                    node.value = decision
            }
            else
                if(decision > node.value)
                    node.value = decision


    }

    return [decision, target]
}



