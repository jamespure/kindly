import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

export default App;
