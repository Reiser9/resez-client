import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import { Cross } from '../../../../components/Icons';

import useAdmin from '../../../../hooks/useAdmin';

import ReloadButton from '../../../../components/ReloadButton';
import UserItem from '../../../../components/UserItem';
import UserAdminItem from '../../../../components/Skeleton/User/UserAdminItem';
import NotContent from '../../../../components/NotContent';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';

const Users = () => {
    const [usersMoreLoading, setUsersMoreLoading] = React.useState(false);

    const {error, userIsLoading, loadUsers, getAllUsers, userBlock, userUnblock} = useAdmin();
    const {usersIsLoading, users} = useSelector(state => state.admin);

    const loadMoreUsers = async () => {
        setUsersMoreLoading(true);
        await getAllUsers(users?.users?.length, 6);
        setUsersMoreLoading(false);
    }

    React.useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <p className={typography.h3}>Пользователи {!usersIsLoading && `(${users?.totalCount || 0})`}</p>

                <ReloadButton loading={usersIsLoading} onClick={() => loadUsers()} />
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={usersIsLoading}
                dataMoreIsLoading={usersMoreLoading}
                dataLength={users?.users?.length}
                Skeleton={UserAdminItem}
                skeletonLoading={3}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке пользователей" icon={<Cross />} danger />}
                notContent={<NotContent text="Пользователей не найдено" />}
                isLast={users?.isLast}
                loadMoreData={loadMoreUsers}
            >
                {users?.users?.map(data =>
                    <UserItem
                        key={data.id}
                        data={data}
                        loading={userIsLoading?.includes(data.id)}
                        userBlock={() => userBlock(data.id)}
                        userUnblock={() => userUnblock(data.id)}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Users;