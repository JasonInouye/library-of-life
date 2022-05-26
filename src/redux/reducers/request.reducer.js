const pendingStatus = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PENDING_STATUS':
            if (action.payload == undefined) {
                return null;
            } else {
                return action.payload;
            }
        default:
            return state;
    }
}

export default pendingStatus;