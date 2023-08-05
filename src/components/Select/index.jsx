import React from 'react';
import {Select as SelectAnt} from 'antd';

import styles from './index.module.css';

import { ArrowBottom } from '../Icons';

import NotContent from '../NotContent';

const Select = () => {
    return (
        <SelectAnt
            showSearch
            placeholder="Пользователь"
            className={styles.select}
            suffixIcon={<ArrowBottom width="16" />}
            notFoundContent={<NotContent text="Ничего не найдено" />}
            mode="multiple"
            maxTagCount="responsive"
            options={[
                {
                    value: 'Reiser95',
                    label: 'Reiser95',
                },
                {
                    value: 'xw1nchester',
                    label: 'xw1nchester',
                },
                {
                    value: 'Silence95',
                    label: 'Silence95',
                },
                {
                    value: 'Renderman',
                    label: 'Renderman',
                },
                {
                    value: 'DrDuardoPlay',
                    label: 'DrDuardoPlay',
                }
            ]}
        />
    )
}

export default Select;