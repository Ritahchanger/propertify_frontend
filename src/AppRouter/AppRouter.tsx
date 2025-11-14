import { Routes, Route } from "react-router-dom";

import Login from "@/modules/authentication/user/login/Login";

import Dashboard from "@/modules/dashboard/pages/Dashboard";

import AllProperty from "@/modules/property/pages/AllProperty";

import VacantUnits from "@/modules/units/pages/VacantUnits";

import AllTenants from "@/modules/tenants/pages/AllTenants";

import ProtectedRoute from "./ProtectedRoute";

import FinancialOverview from "@/modules/finance/pages/Finance";

import { Toaster } from "sonner";

import UserManagementDashboard from "@/modules/user/pages/User";

import Analytics from "@/modules/analytics/pages/Analytics";

import UnitDetails from "@/modules/units/pages/UnitHistory";

import EstateHistoryPage from "@/modules/property/pages/EstateHistory";

import Signup from "@/modules/authentication/user/signup/Signup";

import Applications from "@/modules/applications/pages/Applications";

import TenantsDashboard from "@/modules/customers-tenants/dashboard/pages/dashboard";

import Home from "@/modules/home/home/Home";

const AppRoute = () => {
  return (
    <div>
      <Routes>

      <Route path="/" element={<Home />} />

        <Route path="/auth/user/login" element={<Login />} />

        <Route path="/register" element={<Signup />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/property" element={<AllProperty />} />

          <Route path="/dashboard/property/:unitId" element={<UnitDetails />} />

          <Route path="/properties/vacant" element={<VacantUnits />} />
          <Route
            path="/dashboard/properties/tenants"
            element={<AllTenants />}
          />
          <Route path="/financial/income" element={<FinancialOverview />} />

          <Route path="/dashboard/analytics" element={<Analytics />} />

          <Route
            path="/dashboard/user/management"
            element={<UserManagementDashboard />}
          />

          <Route
            path="/dashboard/estate/:estateId"
            element={<EstateHistoryPage />}
          />

          <Route path="/dashboard/applications" element={<Applications />} />

          <Route path="/tenant-dashboard" element={<TenantsDashboard />} />
          
        </Route>
      </Routes>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AppRoute;
