const initialState = {
  contacts: [],
};
export const contactsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_ALL_CONTACTS":
      return { ...state, contacts: action.payload }; // запись чтобы вернуть новый стейт в массиве со старым / деструктуризация юзера

    default:
      return state;
  }
};
