import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "../components/";

const Auth: FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Auth;
