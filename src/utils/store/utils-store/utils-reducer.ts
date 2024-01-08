import {AlphaBetaNode, Node} from "../../data-structures";

const INITIAL_VALUE = {
    modal: {
        opened: false,
        type: '',
        content: undefined
    },
    infoModal: {
        opened: false,
        content: undefined
    },
    errorModal: {
        opened: false,
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
} | {
    type: 'SET_INFO_MODAL'
    payload: {
        opened: boolean
        content: string | undefined | Node
    }
} | {
    type: 'SET_ERROR_MODAL'
    payload: {
        opened: boolean
        content: string | undefined | Node | AlphaBetaNode
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
        case 'SET_INFO_MODAL':
            return {
                ...state,
                infoModal: payload
            }
        case 'SET_ERROR_MODAL':
            return {
                ...state,
                errorModal: payload
            }
        default:
            return state
    }
}