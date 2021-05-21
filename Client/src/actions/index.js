import axiosConfig from "../helpers/axiosConfig";


export const getAllContacts = () => {
  return (dispatch) => {
    axiosConfig.get("user/getAllContacts").then(({ data }) => {
      dispatch(getAllContactsData(data));
    });
  };
};

const getAllContactsData = (payload) => {
  return {
    type: "GET_ALL_CONTACTS",
    payload,
  };
};

export const getAllDialogs = () => {
  return (dispatch) => {
    axiosConfig.get("user/getAllDialogs").then(({ data }) => {
      dispatch(getAllDialogsData(data));
    });
  };
};

const getAllDialogsData = (payload) => {
  return {
    type: "GET_ALL_DIALOGS",
    payload,
  };
};

export const addContact = (payload) => {
  return (dispatch) => {
    axiosConfig
      .post(`user/addContact`, {
        phonenumber: payload,
      })
      .then(({ data }) => {
        dispatch(addContactData(data));
      });
  };
};

const addContactData = (payload) => {
  return {
    type: "ADD_CONTACT",
    payload,
  };
};
export const deleteContact = (payload) => {
  return (dispatch) => {
    axiosConfig.post(`user/deleteContact`, {
      id: payload,
    });

    dispatch(deleteContactData(payload));
  };
};
const deleteContactData = (payload) => {
  return {
    type: "DELETE_CONTACT",
    payload,
  };
};
export const joinConstant = () =>({
  type:"SET_JOIN_CONSTANT"
})