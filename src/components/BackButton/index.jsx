import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

import { ArrowLeft } from '../Icons';

const BackButton = ({...props}) => {
    const navigate = useNavigate();

    return (
        <button className={styles.back} onClick={() => navigate(-1)} {...props}>
            <ArrowLeft />
        </button>
    )
}

export default BackButton;