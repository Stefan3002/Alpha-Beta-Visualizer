import {AlphaBetaNode, Node} from "./data-structures";
import {read} from "node:fs";

type settingsType = {
    delay: number,
    draw_speed: number,
    waitOnUser: boolean
}

export let settings: settingsType = {
    delay: 700,
    draw_speed: .08,
    waitOnUser: false
}

export const setSettings = (newSettings: settingsType) => {
    settings.delay = newSettings.delay
    settings.waitOnUser = newSettings.waitOnUser
}

export const waitOnUser = (): Promise<void> => {
    const continueButton = document.querySelector('.continue')!
    return new Promise((resolve, reject) => {
        continueButton.addEventListener('click', () => {
            resolve()
        }, {once: true})
    })
}

export const getSettings = () => settings


export const checkLeavesValidity = (root: Node | AlphaBetaNode): boolean => {
    const ready = {
        ready: true
    }
    _checkLeavesValidityAux(root, ready)
    return ready.ready
}
const _checkLeavesValidityAux = (root: Node | AlphaBetaNode, ready: {ready: boolean}): void => {
    console.log('read', root)
    for(let node of root.children)
        if(node.leaf) {
            if (node.value === undefined)
                ready.ready = false
        }
        else
            _checkLeavesValidityAux(node, ready)
}

