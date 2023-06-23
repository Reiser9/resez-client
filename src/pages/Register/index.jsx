import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';
import styles from './index.module.css';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';

const Register = () => {
    const [nickname, setNickname] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");

    const {isLoading, register} = useAuth();
    const navigate = useNavigate();

    const registerHandler = () => {
        register(nickname, phoneNumber, password, () => navigate("/confirm"));
    }

    return (
        <AuthFormsWrapper>
            <h2 className={typography.h2}>Регистрация</h2>

            <p className={`${typography.text} ${auth.contentInnerText}`}>Все поля обязательны к заполнению</p>

            <div className={auth.contentWrapper}>
                <Input value={nickname} setValue={setNickname} placeholder="Имя пользователя" />
                <Input value={phoneNumber} setValue={setPhoneNumber} placeholder="Номер телефона" mask="+7(999) 999 99-99" />
                <Input value={password} setValue={setPassword} placeholder="Пароль" password />
            </div>

            <p className={`${typography.text2} ${styles.agreeLabel}`}>
                При регистрации вы соглашаетесь с <Link to="/rules">правилами проекта</Link> и <Link to="/oferta">публичной офертой</Link>
            </p>

            <div className={auth.contentBottomInner}>
                <Button loading={isLoading} className={auth.contentButton} onClick={registerHandler}>Зарегистрироваться</Button>

                <div className={auth.contentBottom}>
                    <p className={`${typography.text} ${auth.contentBottomText}`}>
                        Есть аккаунт? <Link to="/login" className={auth.contentBottomLink}>Войти</Link>
                    </p>
                </div>
            </div>
        </AuthFormsWrapper>
    )
}

export default Register;