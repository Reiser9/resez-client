import React from 'react';

import styles from './index.module.css';

import { speakText } from '../../utils/speakText';

import { Volume } from '../Icons';

const CardPart = ({
    text = "",
    onClick = () => {},
    ...props
}) => {
    return (
        <div {...props}>
            <button className={styles.cardVolume} onClick={(e) => {
                e.stopPropagation();
                onClick();
                speakText(text);
            }}>
                <Volume />
            </button>

            {text}
        </div>
    )
}

export default CardPart;