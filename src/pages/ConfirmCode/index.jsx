import React from 'react';
import { Link } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';
import styles from './index.module.css';

import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ConfirmCode = () => {
    const [code, setCode] = React.useState("");

    return (
        <AuthFormsWrapper>
            <h2 className={typography.h2}>Код подтверждения</h2>

            <div className={auth.contentWrapper}>
                <Input value={code} setValue={setCode} placeholder="Код" mask="999999" />
            </div>

            <div className={auth.contentBottomInner}>
                <Button className={auth.contentButton}>Отправить</Button>

                <div className={auth.contentBottom}>
                    <p className={`${typography.text} ${auth.contentBottomText}`}>
                        Есть аккаунт? <Link to="/login" className={auth.contentBottomLink}>Войти</Link>
                    </p>
                </div>
            </div>
        </AuthFormsWrapper>
    )
}

export default ConfirmCode;