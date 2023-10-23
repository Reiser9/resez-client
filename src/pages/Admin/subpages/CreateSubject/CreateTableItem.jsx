import React from 'react';

import styles from './index.module.css';

import { ArrowBottomLong, ArrowTopLong } from '../../../../components/Icons';

const CreateTableItem = ({
    data,
    red,
    green,
    id,
    callbackRed = () => {},
    callbackGreen = () => {},
    onChange = () => {}
}) => {
    const {primaryScore, secondaryScore} = data || {};

    return (
        <div className={`${styles.subjectPointsItem}${(red !== null && red >= id) ? ` ${styles.error}` : ""}${(green !== null && green <= id) ? ` ${styles.success}` : ""}`}>
            <p className={styles.subjectPointsValue}>{primaryScore}</p>

            <div className={styles.subjectPointsActions}>
                <button className={`${styles.subjectPointsAction} ${styles.top}${red === id ? ` ${styles.show}` : ""}`} onClick={callbackRed}>
                    <ArrowTopLong />
                </button>

                <button className={`${styles.subjectPointsAction} ${styles.bottom}${green === id ? ` ${styles.show}` : ""}`} onClick={callbackGreen}>
                    <ArrowBottomLong />
                </button>
            </div>

            <input type="text" className={styles.subjectPointsValue} value={secondaryScore} onChange={(e) => onChange(e, id)} />
        </div>
    )
}

export default CreateTableItem;