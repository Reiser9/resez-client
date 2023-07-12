import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.css';

import {Sun, Moon} from '../../../../components/Icons';

import useTheme from '../../../../hooks/useTheme';

const ChangeMode = () => {
    const {mode} = useSelector(state => state.theme);
    const {changeTheme} = useTheme();

    return (
        <div className={styles.modeContent}>
            <button className={`${styles.modeItem}${mode === "light" ? ` ${styles.active}` : ""}`} onClick={() => changeTheme("light")}>
                <Sun />
            </button>

            <button className={`${styles.modeItem}${mode === "dark" ? ` ${styles.active}` : ""}`} onClick={() => changeTheme("dark")}>
                <Moon />
            </button>
        </div>
    )
}

export default ChangeMode;