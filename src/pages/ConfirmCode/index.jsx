import React from 'react';
import { useNavigate } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';

import useAuth from '../../hooks/useAuth';

import TitleWrpapper from '../../components/Wrapper/TitleWrapper';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ConfirmCode = () => {
    const [code, setCode] = React.useState("");
    const [step, setStep] = React.useState(1);

    const {isLoading, logout, sendCodeRegister, verifyCodeRegister} = useAuth();
    const navigate = useNavigate();

    const sendCode = () => {
        sendCodeRegister(() => setStep(2));
    }

    const verifyCode = () => {
        verifyCodeRegister(code, () => navigate("/"));
    }

    return (
        <TitleWrpapper pageTitle="Код подтверждения">
            <AuthFormsWrapper>
                <h2 className={typography.h2}>Код подтверждения</h2>

                {step === 1 && <>
                    <p className={`${typography.text} ${auth.postText}`}>
                        Перед тем, как отправить код подтверждения, вам нужно написать <a href={process.env.REACT_APP_BOT_LINK} target='_blanc'>нашему боту</a> и следовать инструкциям.
                    </p>

                    <p className={`${typography.text} ${auth.postText}`}>
                        После чего нажмите кнопку ниже
                    </p>
                </>}

                {step === 2 && <div className={auth.contentWrapper}>
                    <Input value={code} setValue={setCode} placeholder="Код" mask="999999" />
                </div>}

                <div className={auth.contentBottomInner}>
                    {step === 1 && <Button loading={isLoading} className={auth.contentButton} onClick={sendCode}>Выслать код</Button>}
                    {step === 2 && <Button loading={isLoading} className={auth.contentButton} onClick={verifyCode}>Отправить</Button>}

                    <Button loading={isLoading} type="empty" className={auth.contentButton} onClick={() => logout()}>Выйти</Button>
                </div>
            </AuthFormsWrapper>
        </TitleWrpapper>
    )
}

export default ConfirmCode;