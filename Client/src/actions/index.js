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
