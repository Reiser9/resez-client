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
    className,
    children,
    ...props
}) => {
    return (
        <div className={input.inputWrapper}>
            {title && <p className={typography.text3}>{title}</p>}

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
                    {...props}
                ></textarea>}

                {children}
            </div>
        </div>
    )
}

export default Textarea;