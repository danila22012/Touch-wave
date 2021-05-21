const initialState = {
  dialogs: [],
};
export const dialogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_ALL_DIALOGS":
      return { ...state, dialogs: action.payload }; // запись чтобы вернуть новый стейт в массиве со старым / деструктуризация юзера

    default:
      return state;
  }
};
