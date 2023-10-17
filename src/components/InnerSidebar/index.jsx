import React from 'react';
import { useLocation } from 'react-router-dom';

import pws from '../../styles/pageWithSidebar.module.css';

import { MenuBlock } from '../Icons';

const InnerSidebar = ({
    icon = <MenuBlock />,
    big = false,
    value,
    setValue,
    className,
    children
}) => {
    const [sidebarActive, setSidebarActive] = React.useState(false);
    
    const location = useLocation();

    React.useEffect(() => {
        if(typeof value === "boolean"){
            return setValue(false);
        }
        
        setSidebarActive(false);
    }, [location]);

    React.useEffect(() => {
        if(typeof value === "boolean"){
            setSidebarActive(value);
        }
    }, [value]);

    return (
        <>
            <div className={`${big ? pws.sidebarOverlayBig : pws.sidebarOverlay}${typeof value === "boolean" ? (value ? ` ${pws.active}` : "") : (sidebarActive ? ` ${pws.active}` : "")}`} onClick={() => {
                if(typeof value === "boolean"){
                    return setValue(false);
                }

                setSidebarActive(false);
            }}>
                <div className={pws.sidebarWrapper}>
                    <div className={`${pws.sidebar}${className ? ` ${className}` : ""}${typeof value === "boolean" ? (value ? ` ${pws.active}` : "") : (sidebarActive ? ` ${pws.active}` : "")}`} onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>

            <button className={`${pws.sidebarMenu}${typeof value === "boolean" ? (value ? ` ${pws.active}` : "") : (sidebarActive ? ` ${pws.active}` : "")}`} onClick={() => {
                if(typeof value === "boolean"){
                    return setValue(true);
                }

                setSidebarActive(true);
            }}>
                {icon}
            </button>
        </>
    )
}

export default InnerSidebar;