// src/contexts/PermissionContext.tsx (continued)
// src/contexts/PermissionContext.tsx
import React, {  useContext, useMemo } from "react";

import { useSelector } from "react-redux";

import { selectUser } from "@/modules/authentication/user/auth-slice/auth.slice";

import { PermissionContext, rolePermissions, routePermissions } from "../PermissionContext";

import type { UserRole,  PermissionContextType } from "../PermissionContext"

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useSelector(selectUser);

  const value = useMemo((): PermissionContextType => {
    // Default values when no user is logged in
    if (!user) {
      return {
        hasPermission: () => false,
        hasRole: () => false,
        canAccessRoute: () => false,
        canDo: () => false,
        userRole: null,
        isApproved: false,
        isActive: false,
        permissions: [],
      };
    }

    const userRole = user.role as UserRole;
    
    const permissions = rolePermissions[userRole] || [];

    // Handle missing approvalStatus and status fields
    const isApproved =
      user.approvalStatus === undefined || user.approvalStatus === "approved";
    const isActive = user.status === undefined || user.status === "active";

    const hasPermission = (permission: string): boolean => {
      return permissions.includes(permission);
    };

    const hasRole = (requiredRoles: UserRole | UserRole[]): boolean => {
      const roles = Array.isArray(requiredRoles)
        ? requiredRoles
        : [requiredRoles];
      return roles.includes(userRole);
    };

    const canAccessRoute = (route: string): boolean => {
      const allowedRoles = routePermissions[route] || [];
      return allowedRoles.includes(userRole);
    };

    const canDo = (resource: string, action: string): boolean => {
      return hasPermission(`${resource}:${action}`);
    };

    return {
      hasPermission,
      hasRole,
      canAccessRoute,
      canDo,
      userRole,
      isApproved,
      isActive,
      permissions,
    };
  }, [user]);

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
};
