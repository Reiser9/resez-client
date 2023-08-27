import React from 'react';
import {Select as SelectAnt} from 'antd';

import styles from './index.module.css';

import { ArrowBottom, Cross } from '../Icons';

import NotContent from '../NotContent';

const Select = ({
    placeholder,
    className,
    options,
    ...props
}) => {
    return (
        <SelectAnt
            showSearch
            placeholder={placeholder}
            className={`${styles.select}${className ? ` ${className}` : ""}`}
            suffixIcon={<ArrowBottom width="16" />}
            notFoundContent={<NotContent text="Ничего не найдено" />}
            removeIcon={<Cross width="14" />}
            options={options}
            {...props}
        />
    )
}

export default Select;