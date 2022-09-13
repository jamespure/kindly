import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/authApi";
import login_1 from "../../../assets/images/auth_1.svg";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setCurrentUser } from "../../../redux/features/authSlice";

const Login: FC = () => {
  const [
    loginUser,
    { data: loginData, isSuccess: isLoginSuccess, isError, isLoading },
  ] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(loginData);

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isSubscribed = false;
    if (isLoginSuccess) {
      dispatch(
        setCurrentUser({
          name: loginData.user.username,
          token: loginData.token,
        })
      );
    }

    return () => {
      isSubscribed = true;
    };
  }, [dispatch, isLoginSuccess, loginData]);

  return (
    <div className="login">
      <div className="">
        <img src={login_1} alt="" />
      </div>
      <div className="">
        <h3 style={{ fontFamily: "Chew" }}>
          Sign In <br /> to Recharge Direct
        </h3>
        <p>
          if you don’t an account you can{" "}
          <Link to="/auth/register">Register here!</Link>
        </p>
      </div>
      <form action="submit" onSubmit={onLogin}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="enter your email address"
          onChange={onChange}
          required={true}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={onChange}
          required={true}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
