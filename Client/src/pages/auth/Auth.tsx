import React, { useState } from "react";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";


type loginProps = {
  setToken: any;
};

const Auth = ({ setToken }: loginProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (  
    <React.Fragment>
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Registration setIsLogin={setIsLogin}  />}
    </React.Fragment>
  );
};
export default Auth;
