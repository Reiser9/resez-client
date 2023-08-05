import React from 'react';
import {DatePicker as DatePickerAnt} from 'antd';
import moment from 'moment-timezone';

import styles from './index.module.css';

import { Date } from '../Icons';

const DatePicker = ({format = "DD.MM.YYYY", placeholder, ...props}) => {
    const disabledDate = (current) => {
        return current && current < moment().startOf("day");
    };

    return (
        <DatePickerAnt
            format={format}
            placeholder={placeholder}
            disabledDate={disabledDate}
            suffixIcon={<Date width="18" />}
            allowClear={false}
            {...props}
        />
    )
}

export default DatePicker;