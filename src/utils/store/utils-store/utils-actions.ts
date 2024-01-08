import {levels, Node} from "../../data-structures";

export const setModal = (payload: {
    opened: boolean,
    type?: string,
    content?: string | Node | {
        info: string
    } | {
        value: string,
        level: levels
    },
}) => {
    return {
        type: 'SET_MODAL',
        payload
    }
}


export const setInfoModal = (payload: {
    opened: boolean,
    content?: string | Node | {
        info: string
    } | {
        value: string,
        level: levels
    },
}) => {
    return {
        type: 'SET_INFO_MODAL',
        payload
    }
}

export const setErrorModal = (payload: {
    opened: boolean,
    content?: string | Node | {
        info: string
    } | {
        value: string,
        level: levels
    },
}) => {
    return {
        type: 'SET_ERROR_MODAL',
        payload
    }
}

