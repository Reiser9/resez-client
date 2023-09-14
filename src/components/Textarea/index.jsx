import React from 'react';

import typography from '../../styles/typography.module.css';
import input from '../Input/index.module.css';
import styles from './index.module.css';

const Textarea = ({
    value,
    setValue = () => {},
    placeholder,
    title,
    disabled = false,
    trackLength = false,
    lengthLimit = 0,
    className,
    children,
    ...props
}) => {
    return (
        <div className={input.inputWrapper}>
            {(title || trackLength) && <div className={input.inputTitleWrapper}>
                {title && <p className={typography.text3}>{title}</p>}
                {trackLength && <p className={`${typography.text3} ${input.limitText} ${value.length >= lengthLimit ? ` ${input.limit}` : ""}`}>{value.length}{lengthLimit ? ` / ${lengthLimit}` : ""}</p>}
            </div>}

            <div className={input.inputInner}>
                {disabled
                ? <textarea
                    placeholder={placeholder}
                    className={`${input.input} ${styles.textarea}${className ? ` ${className}` : ""} ${input.disabled}`}
                    {...props}
                ></textarea>
                : <textarea
                    value={value}
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                    className={`${input.input} ${styles.textarea}${className ? ` ${className}` : ""}`}
                    maxLength={lengthLimit}
                    {...props}
                ></textarea>}

                {children}
            </div>
        </div>
    )
}

export default Textarea;