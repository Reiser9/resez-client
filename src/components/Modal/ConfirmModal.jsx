import React from 'react';

import styles from './index.module.css';

import Modal from '.';
import Button from '../Button';

const ConfirmModal = ({
    value,
    setValue,
    text,
    confirmText = "Да",
    rejectText = "Нет",
    callback = () => {}
}) => {
    const callbackWithClose = () => {
        callback();
        setValue(false);
    }

    return (
        <Modal title="Подтвердите действие" value={value} setValue={setValue} text={text} size="small">
            <div className={styles.confirmModalButtons}>
                {value
                    ? <Button theme="danger" type="light" onClick={callbackWithClose}>{confirmText}</Button>
                    : <Button theme="danger" type="light">{confirmText}</Button>}
                <Button type="light" onClick={() => setValue(false)}>{rejectText}</Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal;