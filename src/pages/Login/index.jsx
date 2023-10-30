import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import NoAuthWrapper from '../../components/Wrapper/NoAuthWrapper';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';

const Login = () => {
    const [nickname, setNickname] = React.useState("");
    const [password, setPassword] = React.useState("");

    const {isLoading, login} = useAuth();

    const loginHandler = (e) => {
        e.preventDefault();

        login(nickname, password);
    }

    return (
        <TitleWrapper pageTitle="Авторизация">
            <NoAuthWrapper>
                <AuthFormsWrapper>
                    <form action="#" onSubmit={loginHandler} className={auth.form}>
                        <h2 className={typography.h2}>Вход</h2>

                        <p className={`${typography.text} ${auth.contentInnerText}`}>Все поля обязательны к заполнению</p>

                        <div className={`${auth.contentWrapper} ${base.baseWrapperGap12}`}>
                            <Input value={nickname} setValue={setNickname} placeholder="Никнейм" />
                            <Input value={password} setValue={setPassword} placeholder="Пароль" password />
                        </div>

                        <Link to="/recovery" className={`${typography.text} ${auth.link}`}>Забыли пароль?</Link>

                        <div className={auth.contentBottomInner}>
                            <Button loading={isLoading} className={auth.contentButton} onClick={loginHandler}>Войти</Button>

                            <div className={auth.contentBottom}>
                                <p className={`${typography.text} ${auth.contentBottomText}`}>
                                    Нет аккаунта? <Link to="/register" className={auth.contentBottomLink}>Зарегистрироваться</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </AuthFormsWrapper>
            </NoAuthWrapper>
        </TitleWrapper>
    )
}

export default Login;