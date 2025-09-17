import { Routes, Route } from "react-router-dom";

import Login from "@/modules/authentication/user/login/Login";

import Dashboard from "@/modules/dashboard/pages/Dashboard";

import AllProperty from "@/modules/property/pages/AllProperty";

import VacantUnits from "@/modules/units/pages/VacantUnits";

import AllTenants from "@/modules/tenants/pages/AllTenants";

import ProtectedRoute from "./ProtectedRoute";

import FinancialOverview from "@/modules/finance/pages/Finance";

import { Toaster } from "sonner";

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
                </Route>
            </Routes>
            <Toaster />
        </div>
    );
};

export default AppRoute;
