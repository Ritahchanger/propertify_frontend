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

const AppRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/property" element={<AllProperty />} />
                    <Route path="/dashboard/properties/vacant" element={<VacantUnits />} />
                    <Route path="/dashboard/properties/tenants" element={<AllTenants />} />
                    <Route path="/financial/income" element={<FinancialOverview />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/dashboard/user/management" element={<UserManagementDashboard />} />
                </Route>
            </Routes>
            <Toaster position="top-right" richColors />
        </div>
    );
};

export default AppRoute;
