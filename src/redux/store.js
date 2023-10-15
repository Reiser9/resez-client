import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth";
import notifySlice from "./slices/notify";
import userSlice from "./slices/user";
import serverSlice from "./slices/server";
import appSlice from "./slices/app";
import sessionSlice from "./slices/session";
import themeSlice from "./slices/theme";
import adminSlice from "./slices/admin";
import trainingSlice from "./slices/training";
import logSlice from "./slices/log";
import roleSlice from "./slices/role";
import callSlice from "./slices/call";
import testSlice from "./slices/test";
import infoSlice from "./slices/info";
import taskSlice from "./slices/task";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notify: notifySlice,
        user: userSlice,
        server: serverSlice,
        app: appSlice,
        session: sessionSlice,
        theme: themeSlice,
        admin: adminSlice,
        training: trainingSlice,
        log: logSlice,
        role: roleSlice,
        call: callSlice,
        test: testSlice,
        info: infoSlice,
        task: taskSlice
    }
});
