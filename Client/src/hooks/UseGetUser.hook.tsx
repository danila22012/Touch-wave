import axiosConfig from "../helpers/axiosConfig";

const UseGetUser = () => {
  
  const getUser = ( contactId:any) => {
    return axiosConfig.get("user/getUser", {
      params:{id:contactId}
    });
  };

  return { getUser };
};

export default UseGetUser;
