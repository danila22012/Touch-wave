import React from "react";
import axiosConfig from "../helpers/axiosConfig";

const UseHttpRequest = () => {
    // export api wrapper
  const getRecentChats = () => {
    return axiosConfig.get("s");
  };

  return { getRecentChats };
};

export default UseHttpRequest;
