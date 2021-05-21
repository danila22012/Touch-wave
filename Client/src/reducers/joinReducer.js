const initialState = {
  joinStatic: 0,
};
export const joinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_JOIN_CONSTANT":
      return { ...state, joinStatic: 1};
    default:
     return state
  }
};
