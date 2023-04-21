export function reducer(state, action) {
  switch (action.type) {
    case 'USER_OK':
      state.userOK = true;
      return {...state};

    case 'USER_NO':
      state.userOK = false;
      return {...state};

    case 'STAFF_INFO':
      state.staffInfo = action.payload;
      return {...state};

    case 'SETTINGS':
      state.settings = action.payload;
      return {...state};

    case 'CURRENTROUTE':
      state.currentRoute = action.payload;
      return {...state};

    default:
      return state;
  }
}
