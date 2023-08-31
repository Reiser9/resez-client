import React from 'react';
import { useLocation } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import { MenuBlock } from '../Icons';

const InnerSidebar = ({children}) => {
    const [sidebarActive, setSidebarActive] = React.useState(false);
    
    const location = useLocation();

    React.useEffect(() => {
        setSidebarActive(false);
    }, [location]);

    return (
        <>
            <div className={`${pws.sidebarOverlay}${sidebarActive ? ` ${pws.active}` : ""}`} onClick={() => setSidebarActive(false)}>
                <div className={pws.sidebarWrapper}>
                    <div className={`${pws.sidebar}${sidebarActive ? ` ${pws.active}` : ""}`} onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>

            <button className={`${pws.sidebarMenu}${sidebarActive ? ` ${pws.active}` : ""}`} onClick={() => setSidebarActive(true)}>
                <MenuBlock />
            </button>
        </>
    )
}

export default InnerSidebar;