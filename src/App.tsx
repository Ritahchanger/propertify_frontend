import { Routes, Route } from "react-router-dom";

import Login from "./modules/authentication/user/login/Login";

import Dashboard from "./modules/dashboard/pages/Dashboard";

import AllProperty from "./modules/property/pages/AllProperty";

import VacantUnits from "./modules/units/pages/VacantUnits";

import AllTenants from "./modules/tenants/pages/AllTenants";

import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/property" element={<AllProperty />} />
        <Route path="/dashboard/properties/vacant" element={<VacantUnits />} />
        <Route path="/dashboard/properties/tenants" element={<AllTenants />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
