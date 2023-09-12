import React from 'react';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { User } from '../../../../components/Icons';

import useAdmin from '../../../../hooks/useAdmin';

import ReloadButton from '../../../../components/ReloadButton';
import UserItem from '../../../../components/UserItem';
import Button from '../../../../components/Button';
import UserAdminItem from '../../../../components/Skeleton/User/UserAdminItem';
import NotContent from '../../../../components/NotContent';

const Users = () => {
    const [usersMoreLoading, setUsersMoreLoading] = React.useState(false);

    const {usersIsLoading, users} = useSelector(state => state.admin);

    const {error, userIsLoading, loadUsers, getAllUsers, userBlock, userUnblock} = useAdmin();

    const loadMoreSession = async () => {
        setUsersMoreLoading(true);
        await getAllUsers(users?.users?.length, 6);
        setUsersMoreLoading(false);
    }

    React.useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className={styles.users}>
            <div className={styles.usersTitleInner}>
                <p className={typography.h3}>Пользователи {!usersIsLoading && `(${users?.totalCount || 0})`}</p>

                <ReloadButton loading={usersIsLoading} onClick={() => loadUsers()} />
            </div>

            {usersIsLoading
            ? <div className={styles.usersContent}>
                {[...Array(3)].map((_, id) => <UserAdminItem key={id} />)}
            </div>
            : error ? <NotContent text="Ошибка при загрузке пользователей" />
            : users?.users?.length > 0 ? <div className={styles.usersContent}>
                {users?.users?.map(data =>
                    <UserItem
                        key={data.id}
                        data={data}
                        loading={userIsLoading.includes(data.id)}
                        userBlock={() => userBlock(data.id)}
                        userUnblock={() => userUnblock(data.id)}
                    />)}
            </div> : <NotContent text="Пользователей не найдено" icon={<User />} />}

            {usersMoreLoading && <div className={styles.usersContent}>
                {[...Array(3)].map((_, id) => <UserAdminItem key={id} />)}
            </div>}

            {users?.users?.length > 0 && !usersIsLoading && !users?.isLast &&
            <Button loading={usersMoreLoading} type="empty" auto className={styles.usersMoreButton} onClick={loadMoreSession}>
                Показать еще
            </Button>}
        </div>
    )
}

export default Users;