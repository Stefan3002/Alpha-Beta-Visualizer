import {Node} from "../../data-structures";

const INITIAL_VALUE = {
    modal: {
        opened: false,
        type: '',
        content: undefined
    }
}

type actionType = {
    type: 'SET_MODAL'
    payload: {
        opened: boolean
        type?: string,
        content: string | undefined | Node
    }
}

export const utilsReducer = (state = INITIAL_VALUE, action: actionType) => {
    if(!action)
        return state
    const {type, payload} = action
    switch (type){
        case 'SET_MODAL':
            return {
                ...state,
                modal: payload
            }
        default:
            return state
    }
}