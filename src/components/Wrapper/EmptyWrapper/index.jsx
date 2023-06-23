import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../Header";

const EmptyWrapper = () => {
    return (
        <>
            <Header empty />

            <Outlet />
        </>
    );
};

export default EmptyWrapper;
