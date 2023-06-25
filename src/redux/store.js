import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth";
import notifySlice from "./slices/notify";
import userSlice from "./slices/user";
import serverSlice from "./slices/server";
import appSlice from "./slices/app";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notify: notifySlice,
        user: userSlice,
        server: serverSlice,
        app: appSlice
    },
});
