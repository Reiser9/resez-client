import React from 'react';
import {Select as SelectAnt} from 'antd';

import styles from './index.module.css';

import { ArrowBottom, Cross } from '../Icons';

import NotContent from '../NotContent';
import Preloader from '../Preloader';

const Select = ({
    placeholder,
    className,
    options,
    notContentText = "Ничего не найдено",
    loading = false,
    ...props
}) => {
    return (
        <SelectAnt
            showSearch
            placeholder={placeholder}
            className={`${styles.select}${className ? ` ${className}` : ""}`}
            suffixIcon={<ArrowBottom width="16" />}
            notFoundContent={loading ? <Preloader small className={styles.loader} /> : <NotContent text={notContentText} />}
            removeIcon={<Cross width="14" />}
            options={options}
            labelInValue
            {...props}
        />
    )
}

export default Select;