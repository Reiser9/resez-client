import React from 'react';
import InputMask from 'react-input-mask';
import { Checkbox } from 'antd';

import typography from '../../styles/typography.module.css';
import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Minus, Plus } from '../Icons';

import IconButton from '../IconButton';
import Spoiler from '../Spoiler';

const GenerateTestItem = ({
    data,
    setSubThemes = () => {},
    setCountTasks = () => {}
}) => {
    const {number, id, subThemes, theme, totalCount} = data || {};

    const [countTask, setCountTask] = React.useState(0);
    
    const decrementCount = () => {
        setCountTask(prev => prev <= 0 ? prev : Number(prev) - 1);
    }

    const incrementCount = () => {
        setCountTask(prev => prev >= totalCount ? prev : Number(prev) + 1)
    }

    const changeCountHandler = (e) => {
        const value = e.target.value;

        if(value === ""){
            return setCountTask(0);
        }

        if(value > totalCount){
            setCountTask(totalCount);
        }
        else{
            setCountTask(value);
        }
    }

    const chechedSubThemesHandler = (subThemeId) => {
        setSubThemes(id, subThemeId);
    }

    React.useEffect(() => {
        setCountTasks(id, countTask);
    }, [countTask]);

    return (
        <div className={`${styles.generateFormItem}${totalCount === 0 ? ` ${styles.disabled}` : ""}`}>
            <div className={base.titleInner}>
                <p className={typography.h4}>{number} задание</p>

                <div className={styles.generateFormItemCounter}>
                    <IconButton small type="light" onClick={decrementCount} disabled={Number(countTask) === 0}>
                        <Minus />
                    </IconButton>

                    <InputMask className={styles.generateFormItemCount} mask="999" maskChar={""} value={countTask} onChange={changeCountHandler} />

                    <IconButton small type="light" onClick={incrementCount} disabled={Number(countTask) === totalCount}>
                        <Plus />
                    </IconButton>
                </div>
            </div>

            <Spoiler title={`${theme} (${totalCount})`} theme="white">
                <div className={styles.generateFormSubThemes}>
                    {subThemes?.map(data => <Checkbox key={data.id} defaultChecked onChange={() => chechedSubThemesHandler(data.id)}>
                        {data.subTheme} ({data.tasksCount})
                    </Checkbox>)}
                </div>
            </Spoiler>
        </div>
    )
}

export default GenerateTestItem;