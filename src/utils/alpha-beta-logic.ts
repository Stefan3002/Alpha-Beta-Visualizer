// The logic for the AlphaBeta algorithm.


import {levels, AlphaBetaNode, stepAlphaDataType, stepDataType} from "./data-structures";
import {canvasDimensions, colors, usePaintingModule} from "./painting-logic";
import {useDispatch, useSelector} from "react-redux";
import {getModal} from "./store/utils-store/utils-selectors";
import {Dispatch, SetStateAction} from "react";
import {getSettings, waitOnUser} from "./general-logic";
import {highlightAlphaBetaNode, useAlphaBetaPaintingModule} from "./alpha-beta-painting-logic";
import {running} from "./min-max-logic";

const SETTINGS = getSettings()
export let runningAlphaBeta = false


const createDummyTree = (root: AlphaBetaNode) => {
    root.children.push(new AlphaBetaNode(undefined, root, {x: canvasDimensions.width / 2, y: 50}))
    root.children.push(new AlphaBetaNode(undefined, root, {x: 150, y: 20}))

    root.children[0].children.push(new AlphaBetaNode(1, root.children[0],{x: 20, y: 40}))
    root.children[0].children.push(new AlphaBetaNode(0, root.children[0], {x: 40, y: 40}))

    root.children[1].children.push(new AlphaBetaNode(4, root.children[1], {x: 140, y: 40}))
    root.children[1].children.push(new AlphaBetaNode(8, root.children[1], {x: 160, y: 40}))
}

export const useAlphaBetaAlgo = () => {
    const initPaintingModule = useAlphaBetaPaintingModule()
    const dispatch = useDispatch()
    const modal = useSelector(getModal)

    return async () => {
        const root = new AlphaBetaNode()
        // createDummyTree(root)
        await initPaintingModule(root)

        // await solveMinMax(root)
        // One last time for the root we decide on the value (max level)

        return root
    }
}

export const solveAlphaBetaFront = async ( root: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setAlphaInfoCallback: Dispatch<SetStateAction<stepAlphaDataType>>) => {
    runningAlphaBeta = true
    await solveAlphaBeta( root, setInfoCallback, setAlphaInfoCallback)
    const prune = await getDecision( root, setInfoCallback, setAlphaInfoCallback)
    // setAlphaBetaNodeValue(root, decision)
}

export const solveAlphaBeta = async (node: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setAlphaInfoCallback: Dispatch<SetStateAction<stepAlphaDataType>>) =>{
    // Highlight the current AlphaBetaNode
    await highlightAlphaBetaNode(node)
    const ready = await readyToDecide(node)
    let prune = false
    if(ready) {
        prune = await getDecision(node, setInfoCallback, setAlphaInfoCallback)

        await highlightAlphaBetaNode(node, colors.comparison)
        // await highlightAlphaBetaNode(target, colors.comparison)
        // setAlphaBetaNodeValue(AlphaBetaNode, decision)
        if(SETTINGS.waitOnUser)
            await waitOnUser()
        // return;
    }
    // Traverse all children from left to right.
    if(!prune && !ready) {
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i]
            child.beta = node.beta
            child.alpha = node.alpha
            await solveAlphaBeta(child, setInfoCallback, setAlphaInfoCallback)
            const ready = await readyToDecide(node)
            if(ready)
                break
        }

    }
// Going up, change alpha and beta (maybe?)
    if(node.father){
        await highlightAlphaBetaNode(node, colors.comparison)
        await highlightAlphaBetaNode(node.father, colors.comparison)

        if(node.father.level === levels.min) {
            setInfoCallback({
                value: `${node.beta} ? ${node.alpha} ? ${node.father.beta}`,
                level: node.father.level,
                father: node.father,
                node: node
            })
            if(SETTINGS.waitOnUser)
                await waitOnUser()
            node.father.beta = Math.min(node.beta, node.alpha, node.father.beta)
        }
        else {
            setInfoCallback({
                value: `${node.beta} ? ${node.alpha} ? ${node.father.alpha}`,
                level: node.father.level,
                father: node.father,
                node: node
            })
            if(SETTINGS.waitOnUser)
                await waitOnUser()
            node.father.alpha = Math.max(node.beta, node.alpha, node.father.alpha)
        // TODO: Verify the pruning and add some UI thingy for the prune!
        }
    }

    // Verify AGAIN! as some children have been modified!!!
    // GUARD
    // if(node.value !== undefined)
    //     return;
    //
    // const ready2 = await readyToDecide(node)
    //
    // if(ready2) {
    //     const prune = await getDecision( node, setInfoCallback, setAlphaInfoCallback)
    //
    //     await highlightAlphaBetaNode(node)
    //     // setAlphaBetaNodeValue(AlphaBetaNode, decision2)
    //     await highlightAlphaBetaNode(node, colors.comparison)
    //     if(SETTINGS.waitOnUser)
    //         await waitOnUser()
    //     // await highlightAlphaBetaNode(target2, colors.comparison)
    // }
}

const readyToDecide = async (AlphaBetaNode: AlphaBetaNode): Promise<boolean> => {
    let ready = true

    // Traverse all children from left to right.
    for(let child of AlphaBetaNode.children) {
        // await highlightAlphaBetaNode(child)
        // All children must have filled in values.
        if (child.value === undefined) {
            ready = false
            break
        }
    }
    return ready
}

const getDecision = async (node: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setAlphaInfoCallback: Dispatch<SetStateAction<stepAlphaDataType>>): Promise<boolean> => {
    // Returns whether to prune or not

    // Traverse all children from left to right.
    for(let child of node.children) {
        // await highlightAlphaBetaNode(child)
        await highlightAlphaBetaNode(child, colors.comparison)
        setInfoCallback({
            value: `${child.value} ? ${node.level === levels.min ? node.beta : node.alpha}`,
            level: node.level,
            father: node,
            node: child
        })
        setAlphaInfoCallback({
            alpha: node.alpha,
            beta: node.beta
        })
        if(SETTINGS.waitOnUser)
            await waitOnUser()
        // Maybe prune?
        if(node.alpha >= node.beta)
            return true
        //    Compute the decision itself.
        if(node.level === levels.min) {
            if (child.value! < node.beta)
                node.beta = child.value!

        }
        else
        if (child.value! > node.alpha)
            node.alpha = child.value!


    }
    return false
}



