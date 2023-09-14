import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.css';

import { setSidebarShow } from '../../redux/slices/app';

const Sidebar = ({children}) => {
    const {sidebarShow} = useSelector(state => state.app);

    const dispatch = useDispatch();

    const sidevarRef = React.useRef(null);

    const outsideSidebarClick = (e) => {
        if(sidevarRef.current && !sidevarRef.current.contains(e.target)){
            dispatch(setSidebarShow(false));
        }
    }

    React.useEffect(() => {
        window.addEventListener("click", outsideSidebarClick);

        return () => {
            window.removeEventListener("click", outsideSidebarClick);
        }
    }, []);

    return (
        <aside className={`${styles.sidebar}${sidebarShow ? ` ${styles.active}` : ""}`} ref={sidevarRef}>
            {children}
        </aside>
    )
}

export default Sidebar;