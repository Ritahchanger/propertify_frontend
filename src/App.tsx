import { Routes, Route } from "react-router-dom";
import Login from "./modules/authentication/user/login/Login";

import Dashboard from "./modules/dashboard/pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
