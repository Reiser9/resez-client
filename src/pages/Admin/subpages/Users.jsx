import React from 'react';
import { Tooltip } from 'antd';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import useAdmin from '../../../hooks/useAdmin';

import ReloadButton from '../../../components/ReloadButton';
import UserItem from '../../../components/UserItem';

const Users = () => {
    const {getUsers} = useAdmin();

    React.useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={styles.users}>
            <div className={styles.usersTitleInner}>
                <p className={typography.h3}>Пользователи (3)</p>

                <ReloadButton />
            </div>

            <div className={styles.usersContent}>
                <UserItem data={{
                    avatar: "",
                    level: 2,
                    nickname: "Абубакар",
                    phoneNumber: "1239128432",
                    theme: {
                        primary: "#2ebaee"
                    }
                }} />
            </div>
        </div>
    )
}

export default Users;