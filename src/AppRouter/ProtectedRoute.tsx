import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { loadUserFromStorage } from "@/modules/authentication/user/auth-slice/auth.slice";
import type { RootState, AppDispatch } from "@/store/store";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            await dispatch(loadUserFromStorage());
            setInitialized(true);
        };
        init();
    }, [dispatch]);

    if (!initialized || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
