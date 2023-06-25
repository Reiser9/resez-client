import React from 'react';
import { Link } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';
import styles from './index.module.css';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import NoAuthWrapper from '../../components/Wrapper/NoAuthWrapper';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Recovery = () => {
    const [phoneNumber, setPhoneNumber] = React.useState("");

    return (
        <TitleWrpapper pageTitle="Восстановление пароля">
            <NoAuthWrapper>
                <AuthFormsWrapper>
                    <h2 className={typography.h2}>Восстановление пароля</h2>

                    <div className={auth.contentWrapper}>
                        <Input mask="+7(999) 999 99-99" value={phoneNumber} setValue={setPhoneNumber} placeholder="Номер телефона" />
                    </div>

                    <div className={auth.contentBottomInner}>
                        <Button className={auth.contentButton}>Восстановить</Button>

                        <div className={auth.contentBottom}>
                            <p className={`${typography.text} ${auth.contentBottomText}`}>
                                Вспомнили пароль? <Link to="/login" className={auth.contentBottomLink}>Войти</Link>
                            </p>
                        </div>
                    </div>
                </AuthFormsWrapper>
            </NoAuthWrapper>
        </TitleWrpapper>
    )
}

export default Recovery;