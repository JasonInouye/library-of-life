const connectionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONNECTIONS':
            return action.payload;
        default:
            return state;
    }
}

export default connectionsReducer;