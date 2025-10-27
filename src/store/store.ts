import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "@/modules/layout/admin-layout/components/sidebar/SidebarSlice";

import authSlice from "@/modules/authentication/user/auth-slice/auth.slice";

import propertyModalSlice from "@/modules/property/features/AddPropertyModalSlice";

import authAttemptsSlice from "@/modules/analytics/features/authAttemptsSlice";

import { estatesSlice } from "@/modules/property/features/EstatesSlice";

import unitsSlice from "@/modules/property/features/UnitSlice";


import applicationsSlice from "@/modules/property/features/ApplicationsSlice";


import tenantsSlice from "@/modules/tenants/features/tenant.slice";


export const store = configureStore({

  reducer: {

    sidebar: sidebarSlice.reducer,

    auth: authSlice.reducer,

    openPropertyModal: propertyModalSlice.reducer,

    authAttempts: authAttemptsSlice.reducer,

    estates: estatesSlice.reducer,

    units: unitsSlice.reducer,

    applications:applicationsSlice.reducer,

    tenants:tenantsSlice.reducer

  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
