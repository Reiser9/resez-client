import React from 'react';
import { ColorPicker } from 'antd';

import styles from './index.module.css';

import Input from '../Input';

const ColorPickerInput = ({
    title,
    hexString,
    ...props
}) => {
    return (
        <ColorPicker {...props}>
            <Input readOnly value={hexString} title={title}>
                <div className={styles.colorView} style={{background: hexString}}></div>
            </Input>
        </ColorPicker>
    )
};

export default ColorPickerInput;