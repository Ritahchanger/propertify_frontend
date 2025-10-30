// src/contexts/PermissionContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/modules/authentication/user/auth-slice/auth.slice";

export type UserRole = "owner" | "manager" | "tenant" | "accountant";

// Define permissions for each role
export const rolePermissions: Record<UserRole, string[]> = {
  owner: [
    "users:create",
    "users:read",
    "users:update",
    "users:delete",
    "properties:create",
    "properties:read",
    "properties:update",
    "properties:delete",
    "financial:read",
    "financial:update",
    "approvals:manage",
    "reports:view",
    "settings:manage",
  ],
  manager: [
    "users:read",
    "users:update",
    "properties:create",
    "properties:read",
    "properties:update",
    "financial:read",
    "approvals:manage",
    "reports:view",
  ],
  accountant: [
    "financial:read",
    "financial:update",
    "properties:read",
    "reports:view",
  ],
  tenant: [
    "properties:read",
    "payments:create",
    "payments:read",
    "profile:update",
  ],
};

// Route permissions
export const routePermissions: Record<string, UserRole[]> = {
  "/dashboard": ["owner", "manager", "accountant", "tenant"],
  "/admin": ["owner", "manager"],
  "/financial": ["owner", "manager", "accountant"],
  "/properties": ["owner", "manager", "tenant", "accountant"],
  "/tenants": ["owner", "manager"],
  "/reports": ["owner", "manager", "accountant"],
  "/profile": ["owner", "manager", "tenant", "accountant"],
  "/settings": ["owner"],
};

interface PermissionContextType {
  hasPermission: (permission: string) => boolean;
  hasRole: (requiredRoles: UserRole | UserRole[]) => boolean;
  canAccessRoute: (route: string) => boolean;
  canDo: (resource: string, action: string) => boolean;
  userRole: UserRole | null;
  isApproved: boolean; // Default to true if not in response
  isActive: boolean; // Default to true if not in response
  permissions: string[];
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);


export { PermissionContext, type PermissionContextType }
