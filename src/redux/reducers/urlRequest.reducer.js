const urlReducer = (state = [], action) => {
    console.log('this is the payload', action.payload);
    switch (action.type) {
        case 'SET_UPLOAD_VID_URL':
            return action.payload;
        case 'CLEAR_UPLOAD_URL':
            return [];
        default:
            return state;
    }
};
export default urlReducer;