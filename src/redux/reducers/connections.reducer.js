const connectionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONNECTIONS':
            console.log('list of connections', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default connectionsReducer;