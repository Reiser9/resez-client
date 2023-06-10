import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth";
import notifySlice from "./slices/notify";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notify: notifySlice,
    },
});
