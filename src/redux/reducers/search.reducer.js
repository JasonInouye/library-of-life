import { combineReducers } from 'redux';

const listOfUsers = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST_OF_USERS':
            const listOfUsersMinusYourself = action.payload.listOfUsers;
            const currentUser = action.payload.currentUser.id;
            return listOfUsersMinusYourself.filter(searchedUser => searchedUser.id != currentUser);
        case 'CLEAR_LIST_OF_USERS':
                return [];
        default:
            return state;
    }
}

const searchedUser = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCHED_USER':
            return action.payload;
        case 'CLEAR_SEARCHED_USER':
            return [];
        default:
            return state;
    }
}

// const searchedUserVideos = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_SEARCHED_USER_VIDEOS':
//             return action.payload;
//         default:
//             return state;
//     }
// }

export default combineReducers({
    listOfUsers,
    searchedUser,
    // searchedUserVideos
  });