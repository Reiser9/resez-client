import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

import Preloader from "../Preloader";

const typesButton = {
    fill: styles.fill,
    outline: styles.outline,
    empty: styles.empty,
    light: styles.light,
};

const themesButton = {
    primary: styles.primary,
    danger: styles.danger,
};

const Button = ({
    text,
    auto = false,
    loading = false,
    disabled = false,
    small = false,
    type = "fill",
    theme = "primary",
    to = "",
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={`${styles.buttonInner}${
                className ? ` ${className}` : ""
            }${auto ? ` ${styles.auto}` : ""}`}
        >
            {disabled ? (
                <button
                    className={`${styles.button} ${styles.disabled} ${
                        typesButton[type]
                    } ${themesButton[theme]}${small ? ` ${styles.small}` : ""}`}
                >
                    {text}
                    {children}
                </button>
            ) : to ? (
                <Link
                    to={to}
                    className={`${styles.button} ${typesButton[type]} ${
                        themesButton[theme]
                    }${small ? ` ${styles.small}` : ""}`}
                    {...props}
                >
                    {text}
                    {children}
                </Link>
            ) : loading ? (
                <button
                    className={`${styles.button} ${styles.disabled} ${
                        typesButton[type]
                    } ${themesButton[theme]}${small ? ` ${styles.small}` : ""}`}
                ></button>
            ) : (
                <button
                    className={`${styles.button} ${typesButton[type]} ${
                        themesButton[theme]
                    }${small ? ` ${styles.small}` : ""}`}
                    {...props}
                >
                    {text}
                    {children}
                </button>
            )}

            {loading && (
                <span className={styles.buttonPreloader}>
                    <Preloader small />
                </span>
            )}
        </div>
    );
};

export default Button;
