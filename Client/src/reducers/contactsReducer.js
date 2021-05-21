const initialState = {
  contacts: [],
};
export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CONTACTS":
      return { ...state, contacts: action.payload }; // запись чтобы вернуть новый стейт в массиве со старым / деструктуризация юзера
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};
