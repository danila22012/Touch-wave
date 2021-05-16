import axiosConfig from "../helpers/axiosConfig";


const useAuth = () => {
  type signInProps = {
    login:String,
    password:String
  }
  const signIn = ({login, password}:signInProps) => {
    return axiosConfig.post("/login",{
      login,password
    });
  };

  return { signIn };
};

export default useAuth;
