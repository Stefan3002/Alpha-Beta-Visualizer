// The logic for the AlphaBeta algorithm.


import {AlphaBetaNode, errorType, levels, stepDataType} from "./data-structures";
import {useDispatch, useSelector} from "react-redux";
import {getModal} from "./store/utils-store/utils-selectors";
import {Dispatch, SetStateAction} from "react";
import {checkLeavesValidity, getSettings, waitOnUser} from "./general-logic";
import {highlightAlphaBetaNode, useAlphaBetaPaintingModule} from "./alpha-beta-painting-logic";
import {canvasDimensions, colors} from "./painting-general-logic";

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

export const solveAlphaBetaFront = async ( root: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setErrorCallback: Dispatch<SetStateAction<errorType>>) => {
    // Check to see if you are good to go
    // Maybe there are leafs with no value
    if(!checkLeavesValidity(root)){
        // The date is to not have the same message, as it will NOT
        // trigger the useEffect hook!!!
        // The +++ is a delimiter to be trimmed in the useEffect
        setErrorCallback('There are leaves with no value set.+++' + Date.now())
        return;
    }
    // Maybe there is only the root in place
    if(root.children.length === 0){
        setErrorCallback('There are no nodes created.+++' + Date.now())
        return;
    }

    runningAlphaBeta = true
    await solveAlphaBeta( root, setInfoCallback, setErrorCallback)
    // const prune = await getDecision( root, setInfoCallback, setErrorCallback)
    // setAlphaBetaNodeValue(root, decision)
}


export const solveAlphaBeta = async (node: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setErrorCallback: Dispatch<SetStateAction<errorType>>) => {
    // Highlight the current AlphaBetaNode
    await highlightAlphaBetaNode(node)
    // Traverse all children from left to right.
    for (let i = 0; i < node.children.length; i++) {
        // Check for prune between each child
        // as they directly influence the father's
        // alpha and beta
        if(node.alpha >= node.beta) {
            console.log('PRUNED!', node)
            // TODO: Fix the coloring of pruned nodes
            for(let j = i; j < node.children.length; j++)
                await highlightAlphaBetaNode(node.children[j], colors.pruned)
            break
        }
    //     No need to prune right now!
        const child = node.children[i]
    //     Update the father as we are actually going down
    //     Only if the node has a value set (a.k.a it is a leaf node)
        if(child.leaf)
            await makeDecision(child, setInfoCallback, setErrorCallback)
        else {
            //     Then we go down!
            // Do not forget to copy the values! (U go down!)
            child.alpha = node.alpha
            child.beta = node.beta
            await solveAlphaBeta(child, setInfoCallback, setErrorCallback)
        }
    }
//     Here we go UP!
//     We start comparing things here!
    await _upDecision(node, setInfoCallback, setErrorCallback)
}
const _upDecision = async (node: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setErrorCallback: Dispatch<SetStateAction<errorType>>) => {
    // Stop if this is the root!
    if(!node.father)
        return
    if(node.father.level === levels.min){
        setInfoCallback({
            value: `${node.father.beta} ? ${node.beta} ? ${node.alpha}`,
            level: node.father.level,
            father: node.father,
            node: node
        })
        node.father.beta = Math.min(node.father.beta, node.beta, node.alpha)
        if(SETTINGS.waitOnUser)
            await waitOnUser()
    }
    else{
        setInfoCallback({
            value: `${node.father.alpha} ? ${node.beta} ? ${node.alpha}`,
            level: node.father.level,
            father: node.father,
            node: node
        })
        if(SETTINGS.waitOnUser)
            await waitOnUser()
        node.father.alpha = Math.max(node.father.alpha, node.beta, node.alpha)

    }
}

const makeDecision = async (node: AlphaBetaNode, setInfoCallback: Dispatch<SetStateAction<stepDataType>>, setErrorCallback: Dispatch<SetStateAction<errorType>>): Promise<void> => {
    // Make sure there is a father
    if(!node.father)
        return
    // And that you have a value to compare
    // Tip: you should not be here if you do not have
    // a set value (a.k.a leaf node)
    if(node.value === undefined)
        return

    // Decide on alpha or beta on the father of the give node.
    await highlightAlphaBetaNode(node, colors.comparison)
        setInfoCallback({
            value: `${node.value} ? ${node.father.level === levels.min ? node.father.beta : node.father?.alpha}`,
            level: node.father.level,
            father: node.father,
            node: node
        })

    if(SETTINGS.waitOnUser)
        await waitOnUser()

        //    Compute the decision itself.
        if(node.father?.level === levels.min) {
            if (node.value < node.father.beta)
                node.father.beta = node.value
        }
        else
        if (node.value! > node.father.alpha)
            node.father.alpha = node.value



}



