import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../Header";

const DefaultWrapper = () => {
    return (
        <>
            <Header />

            <Outlet />
        </>
    );
};

export default DefaultWrapper;
