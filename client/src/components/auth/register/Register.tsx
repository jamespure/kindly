import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../../services/authApi";
import login_1 from "../../../assets/images/auth_1.svg";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setCurrentUser } from "../../../redux/features/authSlice";
import colors from "../../../sass/abstracts/_colors.module.scss";

const Register: FC = () => {
  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      isLoading: isRegisterLoading,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      isLoading: isLoginLoading,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(
    registerData,
    isRegisterSuccess,
    isRegisterLoading,
    isRegisterError,
    isLoginError,
    isLoginLoading,
    loginData
  );

  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let { email, password, username } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, username });

      if (isRegisterSuccess) {
        await loginUser({
          email,
          password,
        });
      }

      setFormData({
        email: "",
        password: "",
        username: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loginInterval = setInterval(() => {
      if (isLoginSuccess) {
        dispatch(
          setCurrentUser({
            name: loginData.user.username,
            token: loginData.token,
          })
        );
        navigate("/profile", { replace: true });
      }
    });

    return () => clearInterval(loginInterval);
  }, [dispatch, isLoginSuccess, loginData, navigate]);

  return (
    <div className="login">
      <div className="">
        <img src={login_1} alt="" />
      </div>
      <div className="">
        <h3>
          Sign In <br /> to Recharge Direct
        </h3>
        <p>
          if you have an account you can{" "}
          <Link to="/auth/login">Login here!</Link>
        </p>
      </div>
      <form action="submit" onSubmit={onRegister}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="enter a username"
          onChange={onChange}
          required={true}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="enter a email address"
          onChange={onChange}
          required={true}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter a password"
          onChange={onChange}
          required={true}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
