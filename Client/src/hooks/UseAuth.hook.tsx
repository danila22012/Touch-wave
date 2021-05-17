import axiosConfig from "../helpers/axiosConfig";


const useAuth = () => {
  type signInProps = {
    login:String,
    password:String
  }
  type signUpProps = {
    username:String,
    secondname:String,
    phonenumber:String,
    login:String,
    password:String
  }
  const signIn = ({login, password}:signInProps) => {
    return axiosConfig.post("/auth/login",{
      login,password
    });
  };
  const signUp = ({username, phonenumber, secondname, login, password}:signUpProps) => {
    return axiosConfig.post("/auth/registration",{
      username, phonenumber, secondname, login, password
    });
  };

  return { signIn, signUp };
};

export default useAuth;
