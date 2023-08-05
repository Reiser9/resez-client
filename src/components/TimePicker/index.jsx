import React from 'react';
import {TimePicker as TimePickerAnt} from 'antd';

import styles from './index.module.css';

import { Clock } from '../Icons';

const TimePicker = ({format = "HH:mm", placeholder, ...props}) => {
    return (
        <TimePickerAnt
            format={format}
            placeholder={placeholder}
            suffixIcon={<Clock width="18" />}
            allowClear={false}
            {...props}
        />
    )
}

export default TimePicker;