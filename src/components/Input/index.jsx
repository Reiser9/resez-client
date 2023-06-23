import React from "react";
import InputMask from "react-input-mask";

import typography from '../../styles/typography.module.css';
import styles from "./index.module.css";

import {Eye, Blind} from '../Icons';

const Input = ({ value, setValue, placeholder, title, password = false, disabled = false, className, ...props }) => {
    const [show, setShow] = React.useState(false);
    const [typeInput, setTypeInput] = React.useState("text");

    React.useEffect(() => {
        if(!show && password){
            setTypeInput("password");
        }
        else{
            setTypeInput("text");
        }
    }, [show, password]);

    return (
        <div className={styles.inputWrapper}>
            {title && <p className={typography.text3}>{title}</p>}

            <div className={styles.inputInner}>
                {disabled
                ? <InputMask
                    maskChar={""}
                    className={`${styles.input}${password ? ` ${styles.password}` : ""}${className ? ` ${className}` : ""}${disabled ? ` ${styles.disabled}` : ""}`}
                    placeholder={placeholder}
                    type={typeInput}
                    {...props}
                />
                : <InputMask
                    maskChar={""}
                    className={`${styles.input}${password ? ` ${styles.password}` : ""}${className ? ` ${className}` : ""}`}
                    value={value}
                    onChange={e => setValue(() => e.target.value)}
                    placeholder={placeholder}
                    type={typeInput}
                    {...props}
                />}

                {password && <div className={styles.inputShow} onClick={() => setShow(prev => !prev)}>
                    {show ? <Blind /> : <Eye />}
                </div>}
            </div>
        </div>
    );
};

export default Input;
