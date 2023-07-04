import React from 'react';
import {useSelector} from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from '../../index.module.css';

import useSession from '../../../../hooks/useSession';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import SessionsSkeleton from '../../../../components/Skeleton/Sessions';
import SessionItemCompact from '../../SessionItemCompact';

const SafeMain = () => {
    const [prevPassword, setPrevPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

    const {isLoading, getAllSessions, endAllSessions} = useSession();
    const {sessions} = useSelector(state => state.session);

    React.useEffect(() => {
        getAllSessions();
    }, []);

    return (
        <>
            <div className={styles.contentBlock}>
                <p className={typography.h3}>
                    Активность
                </p>

                {isLoading
                ? <SessionsSkeleton />
                : <>
                    <div className={styles.sessionWrapper}>
                        <p className={typography.text}>Текущий сеанс</p>

                        <SessionItemCompact current data={sessions?.current || {}} />

                        {sessions?.totalCount > 0 && <Button type="empty" theme="danger" onClick={endAllSessions}>
                            Завершить другие сеансы
                        </Button>}
                    </div>

                    {sessions?.totalCount > 0 && <div className={styles.sessionWrapper}>
                        <p className={typography.text}>Все сеансы ({sessions?.totalCount + 1 || 0})</p>
                        
                        {sessions?.other?.map(data => <SessionItemCompact key={data.id} data={data} />)}

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
                    <Input password placeholder="Старый пароль" value={prevPassword} setValue={setPrevPassword} />
                    <Input password placeholder="Новый пароль" value={newPassword} setValue={setNewPassword} />
                    <Input password placeholder="Повторите новый пароль" value={newPasswordAgain} setValue={setNewPasswordAgain} />

                    <Button>
                        Сменить пароль
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SafeMain;