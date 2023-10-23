import React from 'react';
import {useSelector} from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross, Filter } from '../../../../components/Icons';

import useLogs from '../../../../hooks/useLogs';
import useAdmin from '../../../../hooks/useAdmin';

import ReloadButton from '../../../../components/ReloadButton';
import LogItem from '../../../../components/LogItem';
import LogItemSkeleton from '../../../../components/Skeleton/LogItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import NotContent from '../../../../components/NotContent';
import IconButton from '../../../../components/IconButton';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';

const Logs = () => {
    const [logsMoreLoading, setLogsMoreLoading] = React.useState(false);
    const [logsFilter, setLogsFilter] = React.useState(false);
    const [log, setLog] = React.useState();
    const [user, setUser] = React.useState();
    const [userSelectOpen, setUserSelectOpen] = React.useState(false);
    const [userOptions, setUserOptions] = React.useState([]);
    const [typeOptions, setTypeOptions] = React.useState([]);
    const [userSearchValue, setUserSearchValue] = React.useState("");

    const {logsIsLoading, logs} = useSelector(state => state.log);

    const {error, setLogIsLoading, loadLogs, getAllLogs} = useLogs();
    const {searchUsersLoading, logTypesLoading, getLogTypes, searchUsers} = useAdmin();

    const searchUsersRef = React.useRef(null);

    const loadMoreLogs = async () => {
        setLogsMoreLoading(true);
        await getAllLogs(logs?.logs?.length);
        setLogsMoreLoading(false);
    }

    const searchUsersHandler = () => {
        setUserOptions([]);
        searchUsers(userSearchValue, true).then(users => {
            if(!users){
                return;
            }

            setUserOptions(users.users);
        });
    }

    const dropdownUsers = (open) => {
        setUserSelectOpen(open);

        if(open && userOptions.length === 0){
            searchUsersHandler();
        }
    }

    const dropdownLogTypes = (open) => {
        if(open && typeOptions.length === 0){
            getLogTypes().then(types => {
                if(!types){
                    return;
                }
    
                setTypeOptions(types.logTypes);
            });
        }
    }

    const resetFilter = () => {
        setUser();
        setLog();
        loadLogs(0, 10, "", "", true);
    }

    React.useEffect(() => {
        loadLogs(0, 10);
    }, []);

    React.useEffect(() => {
        if(!userSelectOpen){
            return;
        }

        searchUsersRef.current = setTimeout(searchUsersHandler, 500);

        return () => {
            clearTimeout(searchUsersRef.current);
        }
    }, [userSearchValue]);

    React.useEffect(() => {
        if(user || log){
            loadLogs(0, 8, user, log, true);
        }
    }, [user, log]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <p className={typography.h3}>Логирование {!logsIsLoading && `(${logs?.totalCount || 0})`}</p>

                <div className={base.titleWrapper}>
                    <IconButton small type="light" onClick={() => setLogsFilter(prev => !prev)}>
                        <Filter />
                    </IconButton>
                    
                    <ReloadButton loading={logsIsLoading} onClick={() => loadLogs(0, 8, user, log, true)} />
                </div>
            </div>

            <div className={styles.filterInner}>
                <Select
                    placeholder="Пользователь"
                    className={styles.filterItem}
                    loading={searchUsersLoading}
                    showSearch
                    notContentText="Пользователей не найдено"
                    onSearch={value => setUserSearchValue(value.trim())}
                    onDropdownVisibleChange={dropdownUsers}
                    onChange={value => setUser(value)}
                    filterOption={false}
                    value={user}
                    options={userOptions.map(data => {
                        return {
                            label: data.nickname,
                            value: data.id
                        }
                    })}
                />

                <Select
                    placeholder="Тип лога"
                    className={styles.filterItem}
                    loading={logTypesLoading}
                    notContentText="Типов не найдено"
                    onDropdownVisibleChange={dropdownLogTypes}
                    onChange={value => setLog(value)}
                    value={log}
                    options={typeOptions.map(data => {
                        return {
                            label: data.type,
                            value: data.id
                        }
                    })}
                />

                <Button small auto onClick={resetFilter}>
                    Сбросить фильтры
                </Button>
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={logsIsLoading}
                dataMoreIsLoading={logsMoreLoading}
                dataLength={logs?.logs?.length}
                Skeleton={LogItemSkeleton}
                skeletonLoading={10}
                skeletonMoreLoading={4}
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
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Logs;