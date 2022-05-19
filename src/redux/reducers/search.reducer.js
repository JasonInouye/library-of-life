const listOfUsers = (state = [], action) => {
    switch (action.type) {
      case 'SET_LIST_OF_USERS':
          console.log('list of users', action.payload);
        return action.payload;
      default:
        return state;
    }
  }

  export default listOfUsers;