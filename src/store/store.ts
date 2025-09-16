import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "@/modules/layout/admin-layout/components/sidebar/SidebarSlice";

import authSlice from "@/modules/authentication/user/auth-slice/auth.slice";

export const store = configureStore({

    reducer: {

        sidebar: sidebarSlice.reducer,
        auth: authSlice.reducer

    }

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;





























