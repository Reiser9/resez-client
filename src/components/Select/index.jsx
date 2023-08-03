import React from 'react';
import {Select as SelectAnt} from 'antd';

import styles from './index.module.css';
import { ArrowBottom } from '../Icons';

const Select = () => {
    return (
        <SelectAnt
            showSearch
            placeholder="Пользователь"
            className={styles.select}
            suffixIcon={<ArrowBottom width="16" />}
            options={[
                {
                    value: 'reiser95',
                    label: 'Reiser95',
                },
                {
                    value: 'xw1nchester',
                    label: 'xw1nchester',
                },
                {
                    value: 'silence95',
                    label: 'Silence95',
                },
            ]}
        />
    )
}

export default Select;