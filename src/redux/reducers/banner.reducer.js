const bannerReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_BANNER_REDUCER':
            return action.payload;
        case 'CLEAR_BANNER_REDUCER':
            return state;
        default:
            return state;
    }
    console.log('in bannerReducer, data is', action.payload);

};

// banner URL will be on the redux state at:
// state.bannerReducer
export default bannerReducer;