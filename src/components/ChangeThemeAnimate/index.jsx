import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.css';

import { Moon, Sun } from '../Icons';

const ChangeThemeAnimate = () => {
    const [animateColor, setAnimateColor] = React.useState("");
    const [isAnimate, setIsAnimate] = React.useState(false);
    const [isAnimateIcons, setIsAnimateIcons] = React.useState(false);

    const offAnimateRef = React.useRef();
    const onAnimateIconsRef = React.useRef();
    const offAnimateIconsRef = React.useRef();

    const {mode} = useSelector(state => state.theme);

    const offAnimate = () => {
        setIsAnimate(false);
    }

    const onAnimateIcons = () => {
        setIsAnimateIcons(true);
    }

    const offAnimateIcons = () => {
        setIsAnimateIcons(false);
    }

    React.useEffect(() => {
        if(!animateColor){
            return setAnimateColor(mode);
        }

        offAnimateRef.current = offAnimate;
        onAnimateIconsRef.current = onAnimateIcons;
        offAnimateIconsRef.current = offAnimateIcons;

        setIsAnimate(true);
        if(mode === "light"){
            setAnimateColor("light");
        }
        else{
            setAnimateColor("dark");
        }
        
        setTimeout(offAnimate, 2700);
        setTimeout(onAnimateIcons, 800);
        setTimeout(offAnimateIcons, 1900);

        return () => {
            clearTimeout(offAnimateRef.current);
            clearTimeout(onAnimateIconsRef.current);
            clearTimeout(offAnimateIconsRef.current);
        }
    }, [mode]);

    return (
        <div className={`${styles.themeAnimate}${isAnimate ? ` ${styles.active}` : ""} ${animateColor === "light" ? styles.light : styles.dark}`}>
            <div className={styles.themeAnimateItem}></div>
            <div className={styles.themeAnimateItem}></div>
            <div className={styles.themeAnimateItem}></div>
            <div className={styles.themeAnimateItem}></div>

            <div className={`${styles.themeAnimateIcons}${isAnimateIcons ? ` ${styles.activeIcons}` : ""}`}>
                <Sun className={`${styles.themeAnimateIcon} ${styles.iconSun}`} />

                <Moon className={`${styles.themeAnimateIcon} ${styles.iconMoon}`} />
            </div>
        </div>
    )
}

export default ChangeThemeAnimate;