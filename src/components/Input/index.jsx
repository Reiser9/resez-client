import React from "react";
import InputMask from "react-input-mask";

import typography from '../../styles/typography.module.css';
import styles from "./index.module.css";

import {Eye, Blind} from '../Icons';

import {cleanPhoneNumber} from '../../utils/formatPhone';

const Input = ({ value, setValue, placeholder, title, password = false, disabled = false, onPaste, className, ...props }) => {
    const [show, setShow] = React.useState(false);
    const [typeInput, setTypeInput] = React.useState("text");

    const pasteHandler = () => {
        switch(onPaste) {
            case "phone":
                return (e) => {
                    e.preventDefault();
                    let pastedText = e.clipboardData.getData("text");
                    
                    pastedText = cleanPhoneNumber(pastedText);

                    setValue("+7" + pastedText);

                    setTimeout(() => {
                        const inputElement = e.target;
                        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
                    }, 0);
                }
            default:
                return () => {}
        }
    }

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
                    onPaste={pasteHandler()}
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
