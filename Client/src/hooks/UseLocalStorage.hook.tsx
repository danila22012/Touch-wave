const UseLocalStorage = () => {
  const setToLocalStorage = (token: string) => {
    console.log(token);
    localStorage.setItem("token", token);

  };
  
  const deleteFromLocalStorage = (key:string) =>{
    localStorage.removeItem(key);
  }
  return { setToLocalStorage,deleteFromLocalStorage };
};

export default UseLocalStorage;
