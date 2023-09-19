import React from 'react';
import {useSelector} from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross } from '../../../../components/Icons';

import useLogs from '../../../../hooks/useLogs';

import ReloadButton from '../../../../components/ReloadButton';
import LogItem from '../../../../components/LogItem';
import LogItemSkeleton from '../../../../components/Skeleton/LogItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import NotContent from '../../../../components/NotContent';

const Logs = () => {
    const [logsMoreLoading, setLogsMoreLoading] = React.useState(false);

    const {logsIsLoading, logs} = useSelector(state => state.log);

    const {error, setLogIsLoading, loadLogs, getAllLogs} = useLogs();

    const loadMoreLogs = async () => {
        setLogsMoreLoading(true);
        await getAllLogs(logs?.logs?.length);
        setLogsMoreLoading(false);
    }

    React.useEffect(() => {
        loadLogs();
    }, []);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <p className={typography.h3}>Логирование {!logsIsLoading && `(${logs?.totalCount || 0})`}</p>

                <ReloadButton loading={logsIsLoading} onClick={() => loadLogs()} />
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={logsIsLoading}
                dataMoreIsLoading={logsMoreLoading}
                dataLength={logs?.logs?.length}
                Skeleton={LogItemSkeleton}
                skeletonLoading={4}
                skeletonMoreLoading={2}
                containerClassName={styles.logsContent}
                errorContent={<NotContent text="Ошибка при загрузке логов" icon={<Cross />} danger />}
                notContent={<NotContent text="Логи не найдены" />}
                isLast={logs?.isLast}
                loadMoreData={loadMoreLogs}
            >
                {logs?.logs?.map(data =>
                    <LogItem
                        key={data.id}
                        data={data}
                        loading={setLogIsLoading?.includes(data.id)}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Logs;