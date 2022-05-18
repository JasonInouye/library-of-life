const permissionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PERMISSION':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.permissionReducer
export default permissionReducer;
