import {Node} from "../../data-structures";

export const setModal = (payload: {
    opened: boolean,
    type?: string,
    content?: string | Node
}) => {
    return {
        type: 'SET_MODAL',
        payload
    }
}

