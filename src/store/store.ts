import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "@/modules/layout/admin-layout/components/sidebar/SidebarSlice";

import authSlice from "@/modules/authentication/user/auth-slice/auth.slice";

import propertyModalSlice from "@/modules/property/features/AddPropertyModalSlice";

export const store = configureStore({

    reducer: {

        sidebar: sidebarSlice.reducer,
        auth: authSlice.reducer,
        openPropertyModal: propertyModalSlice.reducer

    }

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;





























