import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';
import styles from './index.module.css';

import useAuth from '../../hooks/useAuth';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import NoAuthWrapper from '../../components/Wrapper/NoAuthWrapper';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
    const [nickname, setNickname] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");

    const {isLoading, register} = useAuth();
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        
        register(nickname, phoneNumber, password, () => navigate("/confirm"));
    }

    return (
        <TitleWrapper pageTitle="Регистрация">
            <NoAuthWrapper>
                <AuthFormsWrapper>
                    <form action="#" onSubmit={registerHandler} className={auth.form}>
                        <h2 className={typography.h2}>Регистрация</h2>

                        <p className={`${typography.text} ${auth.contentInnerText}`}>Все поля обязательны к заполнению</p>

                        <div className={`${auth.contentWrapper} ${base.baseWrapperGap12}`}>
                            <Input value={nickname} setValue={setNickname} placeholder="Никнейм" />
                            <Input value={phoneNumber} setValue={setPhoneNumber} placeholder="Номер телефона" mask="+7(999) 999 99-99" onPaste="phone" />
                            <Input value={password} setValue={setPassword} placeholder="Пароль" password />
                        </div>

                        <p className={`${typography.text2} ${styles.agreeLabel}`}>
                            При регистрации вы соглашаетесь с <Link to="/docs/rules">правилами проекта</Link> и <Link to="/docs/publicoffer">публичной офертой</Link>
                        </p>

                        <div className={auth.contentBottomInner}>
                            <Button loading={isLoading} className={auth.contentButton} onClick={registerHandler}>Зарегистрироваться</Button>

                            <div className={auth.contentBottom}>
                                <p className={`${typography.text} ${auth.contentBottomText}`}>
                                    Есть аккаунт? <Link to="/login" className={auth.contentBottomLink}>Войти</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </AuthFormsWrapper>
            </NoAuthWrapper>
        </TitleWrapper>
    )
}

export default Register;