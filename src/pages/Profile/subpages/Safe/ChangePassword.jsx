import React from 'react';

import styles from '../../index.module.css';

import useUser from '../../../../hooks/useUser';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

const ChangePassword = () => {
    const [passwordChangeStep, setPasswordChangeStep] = React.useState(1);

    const [prevPassword, setPrevPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

    const [passwordCode, setPasswordCode] = React.useState("");

    const {isLoading: userLoading, changePasswordSendCode, changePasswordVerify} = useUser();

    const sendCodeChangePasswordHandler = () => {
        changePasswordSendCode(prevPassword, newPassword, newPasswordAgain, () => setPasswordChangeStep(2));
    }

    const changePasswordHandler = () => {
        changePasswordVerify(passwordCode, prevPassword, newPassword, () => {
            setPrevPassword("");
            setNewPassword("");
            setNewPasswordAgain("");
            setPasswordCode("");
            setPasswordChangeStep(1);
        });
    }

    return (
        <div className={styles.changePasswordWrapper}>
            {passwordChangeStep === 1 && <>
                <Input password placeholder="Старый пароль" value={prevPassword} setValue={setPrevPassword} />
                <Input password placeholder="Новый пароль" value={newPassword} setValue={setNewPassword} />
                <Input password placeholder="Повторите новый пароль" value={newPasswordAgain} setValue={setNewPasswordAgain} />

                <Button loading={userLoading} onClick={sendCodeChangePasswordHandler}>
                    Сменить пароль
                </Button>
            </>}
            
            {passwordChangeStep === 2 && <>
                <Input mask="999999" placeholder="Код подтверждения" value={passwordCode} setValue={setPasswordCode} />

                <Button type="light" onClick={() => setPasswordChangeStep(1)}>
                    Назад
                </Button>

                <Button loading={userLoading} onClick={changePasswordHandler}>
                    Отправить
                </Button>
            </>}
        </div>
    )
}

export default ChangePassword;