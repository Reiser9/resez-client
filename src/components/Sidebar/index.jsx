import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";

import { setSidebarShow } from "../../redux/slices/app";

const Sidebar = ({ children }) => {
    const { sidebarShow } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    const sidebarRef = React.useRef(null);

    const outsideSidebarClick = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            dispatch(setSidebarShow(false));
        }
    };

    React.useEffect(() => {
        window.addEventListener("click", outsideSidebarClick);

        return () => {
            window.removeEventListener("click", outsideSidebarClick);
        };
    }, []);

    return (
        <aside
            className={`${styles.sidebar}${
                sidebarShow ? ` ${styles.active}` : ""
            }`}
            ref={sidebarRef}
        >
            {children}
        </aside>
    );
};

export default Sidebar;
