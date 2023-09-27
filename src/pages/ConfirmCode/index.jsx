import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QRCode, Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import auth from '../../components/Wrapper/AuthFormsWrapper/index.module.css';

import { initCodeData, initUser } from '../../redux/slices/user';

import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import {socket} from '../../utils/socket';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import AuthFormsWrapper from '../../components/Wrapper/AuthFormsWrapper';
import Button from '../../components/Button';

const ConfirmCode = () => {
    const {verificationCodeData} = useSelector(state => state.user);

    const [qrExpired, setQrExpired] = React.useState(false);
    const [remainingTime, setRemainingTime] = React.useState(verificationCodeData?.lifetime / 1000);
    const [link, setLink] = React.useState("1");

    const {isLoading, logout, sendVerificationCode} = useAuth();
    const {alertNotify} = useAlert();
    const dispatch = useDispatch();
    const {mode} = useSelector(state => state.theme);

    const refreshQr = () => {
        sendVerificationCode(() => setQrExpired(false));
    }
    
    React.useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);
      
        if (remainingTime === 0) {
            clearInterval(timer);
            setQrExpired(true);
        }
      
        return () => clearInterval(timer);
    }, [remainingTime]);

    React.useEffect(() => {
        sendVerificationCode();
        
        socket.on("verify", (data) => {
            dispatch(initUser(data.user));
            alertNotify("Успешно", "Аккаунт верифицирован", "success");
        });

        socket.on("verificationCodeUpdated", (data) => {
            dispatch(initCodeData(data.verificationCodeData));
        });

        return () => {
            socket.off("verify");
            socket.off("verificationCodeUpdated");
        };
    }, []);

    React.useEffect(() => {
        setLink(`${process.env.REACT_APP_BOT_LINK}?start=${verificationCodeData?.code}`);
        setRemainingTime(verificationCodeData.lifetime / 1000);
    }, [verificationCodeData]);

    return (
        <TitleWrapper pageTitle="Код подтверждения">
            <AuthFormsWrapper>
                <h2 className={typography.h2}>Верификация аккаунта</h2>

                <p className={`${typography.text} ${auth.postText}`}>
                    Отсканируйте QR-код, либо {qrExpired
                    ? <Tooltip title="Ссылка устарела">
                        <span className={auth.linkExpired}>перейдите по ссылке</span>
                    </Tooltip>
                    : <a href={link} target="_blanc">перейдите по ссылке</a>} и следуйте инструкциям
                </p>

                <div className={auth.verifyItem}>
                    <QRCode
                        errorLevel="H"
                        value={link}
                        icon="/assets/img/logo-circle.svg"
                        color={mode === "light" ? "#333" : "#fff"}
                        status={isLoading ? "loading" : qrExpired ? "expired" : "active"}
                        onRefresh={refreshQr}
                    />
                </div>

                <div className={auth.contentBottomInner}>
                    <Button loading={isLoading} theme="danger" type="empty" className={auth.contentButton} onClick={() => logout()}>Выйти</Button>
                </div>
            </AuthFormsWrapper>
        </TitleWrapper>
    )
}

export default ConfirmCode;