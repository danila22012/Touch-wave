const UseLocalStorage = () => {
  const setToLocalStorage = (token: string) => {
      console.log(token);
    localStorage.setItem("token", token);
  };
  return { setToLocalStorage };
};

export default UseLocalStorage;
