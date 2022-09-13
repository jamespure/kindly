import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Blur, Header } from "./components";
import Auth from "./pages/auth/Auth";

const App: FC = () => {
  return (
    <>
      <Blur />
      <Header />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
