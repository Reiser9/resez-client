import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth";
import notifySlice from "./slices/notify";
import userSlice from "./slices/user";
import serverSlice from "./slices/server";
import appSlice from "./slices/app";
import sessionSlice from "./slices/session";
import themeSlice from "./slices/theme";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notify: notifySlice,
        user: userSlice,
        server: serverSlice,
        app: appSlice,
        session: sessionSlice,
        theme: themeSlice
    },
});
