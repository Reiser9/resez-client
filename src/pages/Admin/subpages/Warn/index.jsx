import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross } from '../../../../components/Icons';

import useWarn from '../../../../hooks/useWarn';
import ReloadButton from '../../../../components/ReloadButton';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import NotContent from '../../../../components/NotContent';
import WarnItem from '../../../../components/WarnItem';
import WarnItemSkeleton from '../../../../components/Skeleton/WarnItem';

const Warn = () => {
    const [warnsMoreLoading, setWarnsMoreLoading] = React.useState(false);

    const {isLoading, error, loadWarns, getAllWarns} = useWarn();
    const {warnsIsLoading, warns} = useSelector(state => state.warn);
    const {user} = useSelector(state => state.user);

    const loadMoreWarns = async () => {
        setWarnsMoreLoading(true);
        await getAllWarns(warns?.complaints?.length);
        setWarnsMoreLoading(false);
    }

    React.useEffect(() => {
        loadWarns(0, 6);
    }, []);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <p className={typography.h3}>Жалобы {!warnsIsLoading && `(${warns?.totalCount || 0})`}</p>

                <ReloadButton loading={warnsIsLoading} onClick={() => loadWarns(0, 6, true)} />
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={warnsIsLoading}
                dataMoreIsLoading={warnsMoreLoading}
                dataLength={warns?.complaints?.length}
                Skeleton={WarnItemSkeleton}
                skeletonLoading={6}
                skeletonMoreLoading={3}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке жалоб" icon={<Cross />} danger />}
                notContent={<NotContent text="Жалобы не найдены" />}
                isLast={warns?.isLast}
                loadMoreData={loadMoreWarns}
            >
                {warns?.complaints?.map(data =>
                    <WarnItem
                        key={data.id}
                        data={data}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Warn;