const pendingStatus = (state = false, action) => {
    switch (action.type) {
        case 'SET_PENDING_STATUS':
            return action.payload;
        default:
            return state;
    }
}

export default pendingStatus;