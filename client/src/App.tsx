import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Blur, Header } from "./components";
import { AuthPage, ProfilePage } from "./pages";

const App: FC = () => {
  return (
    <>
      <Blur />
      <Header />
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
