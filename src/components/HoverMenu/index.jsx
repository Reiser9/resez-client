import React from 'react';

import styles from './index.module.css';

const HoverMenu = ({
    value,
    setValue = () => {},
    button,
    children
}) => {
    const menuRef = React.useRef(null);
    
    const closeMenu = () => {
        setValue(false);
    }

    const handleOutsideClick = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)){
            closeMenu();
        }
    };
  
    React.useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
    
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.hoverMenuWrapper} ref={menuRef}>
            {button}

            <div className={`${styles.hoverMenuOverlay}${value ? ` ${styles.active}` : ""}`} onClick={closeMenu}>
                <div className={styles.hoverMenu}>
                    <div className={styles.hoverMenuContent} onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HoverMenu;