import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import styles from '../../index.module.css';

import useSession from '../../../../hooks/useSession';
import useUser from '../../../../hooks/useUser';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import SessionsSkeleton from '../../../../components/Skeleton/Sessions';
import ReloadButton from '../../../../components/ReloadButton';
import SessionItemCompact from '../../SessionItemCompact';

const SafeMain = () => {
    const [passwordChangeStep, setPasswordChangeStep] = React.useState(1);

    const [prevPassword, setPrevPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

    const [passwordCode, setPasswordCode] = React.useState("");

    const {isLoading, loadSessions, endAllSessions} = useSession();
    const {isLoading: userLoading, changePasswordSendCode, changePasswordVerify} = useUser();
    const {sessionsIsLoading, sessions} = useSelector(state => state.session);
    const navigate = useNavigate();

    const seeSessionFull = (id) => {
        navigate("sessions", {state: {id}})
    }

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

    React.useEffect(() => {
        loadSessions();
    }, []);

    return (
        <>
            <div className={styles.contentBlock}>
                <div className={styles.contentBlockTitleInner}>
                    <p className={typography.h3}>
                        Активность
                    </p>

                    <ReloadButton />
                </div>

                {sessionsIsLoading
                ? <SessionsSkeleton />
                : <>
                    <div className={styles.sessionWrapper}>
                        <p className={typography.text}>Текущий сеанс</p>

                        <SessionItemCompact current data={sessions?.current || {}} onClick={() => seeSessionFull(sessions?.current?.id)} />

                        {sessions?.totalCount > 0 && <Button loading={isLoading} type="empty" theme="danger" onClick={endAllSessions}>
                            Завершить другие сеансы
                        </Button>}
                    </div>

                    {sessions?.totalCount > 0 && <div className={styles.sessionWrapper}>
                        <p className={typography.text}>Все сеансы ({sessions?.totalCount + 1 || 0})</p>
                        
                        {sessions?.other?.slice(0, 3).map(data => <SessionItemCompact key={data.id} data={data} onClick={() => seeSessionFull(data.id)} />)}

                        {sessions?.totalCount > 3 && <Button type="empty" to="sessions">
                            Показать все
                        </Button>}
                    </div>}
                </>}
            </div>

            <div className={styles.contentBlock}>
                <p className={typography.h3}>
                    Смена пароля
                </p>

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

                        <Button loading={userLoading} onClick={changePasswordHandler}>
                            Отправить
                        </Button>
                    </>}
                </div>
            </div>
        </>
    )
}

export default SafeMain;