import React from 'react';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import base from '../../../../styles/base.module.css';

import { Cross } from '../../../../components/Icons';

import useRoles from '../../../../hooks/useRoles';

import Button from '../../../../components/Button';
import ReloadButton from '../../../../components/ReloadButton';
import RoleItem from '../../../../components/RoleItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import NotContent from '../../../../components/NotContent';
import RoleItemSkeleton from '../../../../components/Skeleton/RoleItem';

const Roles = () => {
    const {error, loadRoles, getAllRoles} = useRoles();

    const [rolesMoreLoading, setRolesMoreLoading] = React.useState(false);
    const {rolesIsLoading, roles} = useSelector(state => state.role);

    const loadMoreRoles = async () => {
        setRolesMoreLoading(true);
        await getAllRoles(roles?.roles?.length, 8);
        setRolesMoreLoading(false);
    };

    React.useEffect(() => {
        loadRoles(0, 8);
    }, []);

    React.useEffect(() => {
        if(roles?.roles?.length === 0 && !roles?.isLast){
            loadMoreRoles();
        }
    }, [roles?.roles, roles?.isLast]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Роли {!rolesIsLoading && `(${roles.totalCount || 0})`}</p>

                    <ReloadButton loading={rolesIsLoading} onClick={() => loadRoles(0, 8, true)} />
                </div>

                <Button type="light" disabled={rolesIsLoading} auto to="add">
                    Добавить
                </Button>
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={rolesIsLoading}
                dataMoreIsLoading={rolesMoreLoading}
                dataLength={roles?.roles?.length}
                Skeleton={RoleItemSkeleton}
                skeletonLoading={8}
                skeletonMoreLoading={4}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке ролей" icon={<Cross />} danger />}
                notContent={<NotContent text="Ролей не найдено" />}
                isLast={roles?.isLast}
                loadMoreData={loadMoreRoles}
            >
                {roles?.roles?.map((data, id) => 
                    <RoleItem
                        key={id}
                        data={data}
                        // themeDelete={() => removeTheme(data.id)}
                        // loading={themeIsLoading.includes(data.id)}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Roles;