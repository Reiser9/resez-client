import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';
import styles from './index.module.css';

import useAuth from '../../hooks/useAuth';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import NoAuthWrapper from '../../components/Wrapper/NoAuthWrapper';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Recovery = () => {
    const [step, setStep] = React.useState(1);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [code, setCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordAgain, setPasswordAgain] = React.useState("");

    const {sendRecoveryPasswordCode, verifyRecoveryCode, recoveryPassword} = useAuth();
    const navigate = useNavigate();

    const getCode = () => {
        sendRecoveryPasswordCode(phoneNumber, () => setStep(2));
    }

    const sendCode = () => {
        verifyRecoveryCode(phoneNumber, code, () => setStep(3));
    }

    const verifyPassword = () => {
        recoveryPassword(password, passwordAgain, () => navigate("/"));
    }

    return (
        <TitleWrpapper pageTitle="Восстановление пароля">
            <NoAuthWrapper>
                <AuthFormsWrapper>
                    <h2 className={typography.h2}>Восстановление пароля</h2>

                    {step === 1 && <div className={auth.contentWrapper}>
                        <Input mask="+7(999) 999 99-99" value={phoneNumber} setValue={setPhoneNumber} placeholder="Номер телефона" />
                    </div>}

                    {step === 2 && <div className={auth.contentWrapper}>
                        <Input mask="999999" value={code} setValue={setCode} placeholder="Код" />
                    </div>}

                    {step === 3 && <div className={auth.contentWrapper}>
                        <Input value={password} setValue={setPassword} placeholder="Новый пароль" password />
                        <Input value={passwordAgain} setValue={setPasswordAgain} placeholder="Подтвердите новый пароль" password />
                    </div>}

                    <div className={auth.contentBottomInner}>
                        {step === 1 && <Button className={auth.contentButton} onClick={getCode}>Восстановить</Button>}
                        {step === 2 && <Button className={auth.contentButton} onClick={sendCode}>Отправить</Button>}
                        {step === 3 && <Button className={auth.contentButton} onClick={verifyPassword}>Изменить пароль</Button>}

                        {step < 3 && <div className={auth.contentBottom}>
                            <p className={`${typography.text} ${auth.contentBottomText}`}>
                                Вспомнили пароль? <Link to="/login" className={auth.contentBottomLink}>Войти</Link>
                            </p>
                        </div>}
                    </div>
                </AuthFormsWrapper>
            </NoAuthWrapper>
        </TitleWrpapper>
    )
}

export default Recovery;