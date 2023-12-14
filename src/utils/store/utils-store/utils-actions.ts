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

