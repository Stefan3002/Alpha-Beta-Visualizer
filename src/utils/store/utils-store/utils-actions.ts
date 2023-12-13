import {Node} from "../../data-structures";

export const setModal = (payload: {
    opened: boolean,
    type?: string,
    content?: string | Node | {
        info: string
    },
}) => {
    return {
        type: 'SET_MODAL',
        payload
    }
}

