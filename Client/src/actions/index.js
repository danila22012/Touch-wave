import axiosConfig from "../helpers/axiosConfig";

export const getAllContacts = () => {
  return (dispatch) => {
    axiosConfig
      .get("user/getAllContacts")
      .then(({ data }) => {
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
    axiosConfig
      .get("user/getAllDialogs")
      .then(({ data }) => {
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
