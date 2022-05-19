const listOfUsers = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST_OF_USERS':
            const listOfUsersMinusYourself = action.payload.listOfUsers;
            const currentUser = action.payload.currentUser.id;
            return listOfUsersMinusYourself.filter(searchedUser => searchedUser.id != currentUser);;
        default:
            return state;
    }
}

export default listOfUsers;