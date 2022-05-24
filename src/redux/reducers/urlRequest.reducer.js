const urlReducer = (state = [], action) => {
    // console.log('this is the payload', action.payload);
    switch (action.type) {
        case 'SET_UPLOAD_VID_URL':
            return action.payload;
        default:
            return state;
    }
};
export default urlReducer;