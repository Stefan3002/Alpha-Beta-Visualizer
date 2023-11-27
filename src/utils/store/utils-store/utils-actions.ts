export const setModal = (payload: {
    opened: boolean,
    type?: string,
    content?: string
}) => {
    return {
        type: 'SET_MODAL',
        payload
    }
}

