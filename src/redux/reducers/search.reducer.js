const listOfUsers = (state = [], action) => {
    switch (action.type) {
      case 'SET_LIST_OF_USERS':
          let listOfUsersMinusYourself = [];
          const currentUser = action.payload.currentUser.id

          console.log('payload', action.payload);
          console.log('search stuff', action.payload.listOfUsers);
          console.log('user id in reducer', currentUser);

          listOfUsersMinusYourself = action.payload.listOfUsers

          listOfUsersMinusYourself.filter(searchedUser => searchedUser.id != currentUser);          

          console.log('list of users', action.payload);
          
        return listOfUsersMinusYourself;
      default:
        return state;
    }
  }

  export default listOfUsers;