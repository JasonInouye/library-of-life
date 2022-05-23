const promptReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROMPTS':
            return action.payload;
        case 'CLEAR_PROMPTS':
            return [];
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.promptReducer
export default promptReducer;
