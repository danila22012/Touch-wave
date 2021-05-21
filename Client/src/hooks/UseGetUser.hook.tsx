import axiosConfig from "../helpers/axiosConfig";

const UseGetUser = () => {
  const getUser = (contactId: any) => {
    return axiosConfig.get("user/getUser", {
      params: { id: contactId },
    });
  };
  const getMyUser = () => {
    return axiosConfig.get("user/getMyUser");
  };
  const updateSettings = ( username:any, secondname:any, image:any) => {
    console.log(image);
    return axiosConfig.put("user/updateSettings", {
      username,
      secondname,
      image,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };
  return { getUser, getMyUser, updateSettings };
};

export default UseGetUser;
