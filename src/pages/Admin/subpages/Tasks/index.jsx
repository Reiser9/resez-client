import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import { Cross, Filter } from '../../../../components/Icons';
import { PERMISSIONS } from '../../../../consts/PERMISSIONS';
import { checkPermission } from '../../../../utils/checkPermission';

import useTest from '../../../../hooks/useTest';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import TaskItem from '../../../../components/TaskItem';
import TaskItemSkeleton from '../../../../components/Skeleton/TaskItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';

import NotContent from '../../../../components/NotContent';
import IconButton from '../../../../components/IconButton';
import Modal from '../../../../components/Modal';
import useAdmin from '../../../../hooks/useAdmin';
import Select from '../../../../components/Select';

const Subjects = () => {
    const [tasksMoreLoading, setTasksMoreLoading] = React.useState(false);
    const [tasksFilter, setTasksFilter] = React.useState(false);

    const [subject, setSubject] = React.useState();
    const [theme, setTheme] = React.useState();
    const [subTheme, setSubTheme] = React.useState();
    const [user, setUser] = React.useState();
    const [verify, setVerify] = React.useState();
    const [userSelectOpen, setUserSelectOpen] = React.useState(false);
    const [userOptions, setUserOptions] = React.useState([]);
    const [userSearchValue, setUserSearchValue] = React.useState("");

    const [subjects, setSubjects] = React.useState([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState([]);
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [themes, setThemes] = React.useState([]);
    const [themesFilter, setThemesFilter] = React.useState([]);
    const [themesIsLoading, setThemesIsLoading] = React.useState(false);
    const [subThemes, setSubThemes] = React.useState([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState([]);
    const [subThemesIsLoading, setSubThemesIsLoading] = React.useState(false);

    const searchUsersRef = React.useRef(null);

    const {error, taskIsLoading, loadTasks, getAllTasks, removeTask, verifyTask, getShortSubjects,
        getThemesBySubject, getSubThemesByTheme} = useTest();
    const {searchUsersLoading, searchUsers} = useAdmin();
    const {tasksIsLoading, tasks} = useSelector(state => state.admin);
    const {user: currentUser} = useSelector(state => state.user);

    const loadMoreTasks = async () => {
        setTasksMoreLoading(true);
        await getAllTasks(tasks?.tasks?.length, 5, subject, "", "", verify, user);
        setTasksMoreLoading(false);
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

    const getSubjects = async () => {
        setSubjectsIsLoading(true);
        const response = await getShortSubjects();
        setSubjectsIsLoading(false);

        if(!response){
            return;
        }

        setSubjects(response);
        setSubjectsFilter(response);
    }

    const handleSearchSubject = (value) => {
        const filteredOptions = subjects.filter(subject =>
            subject.subject.toLowerCase().includes(value.toLowerCase())
        );

        setSubjectsFilter(filteredOptions);
    }

    const handleSearchThemes = (value) => {
        const filteredOptions = themes.filter(theme => {
            const themeTemp = `${theme.number}. ${theme.theme}`;
            return themeTemp.toLowerCase().includes(value.toLowerCase());
        });

        setThemesFilter(filteredOptions);
    }

    const handleSearchSubThemes = (value) => {
        const filteredOptions = subThemes.filter(subTheme =>
            subTheme.subTheme.toLowerCase().includes(value.toLowerCase())
        );

        setSubThemesFilter(filteredOptions);
    }

    const dropdownUsers = (open) => {
        setUserSelectOpen(open);

        if(open && userOptions.length === 0){
            searchUsersHandler();
        }
    }

    const subjectsDropdown = (open) => {
        if(open && subjects.length === 0){
            getSubjects();
        }
    }

    const themeDropdown = (open) => {
        if(open && themes.length === 0 && subject){
            getThemes(subject);
        }
    }
    
    const getThemes = async (subject) => {
        setThemesIsLoading(true);
        const response = await getThemesBySubject(subject);
        setThemesIsLoading(false);

        if(!response){
            return;
        }

        setThemes(response);
        setThemesFilter(response);
    }

    const subThemeDropdown = (open) => {
        if(open && subThemes.length === 0 && theme){
            getSubThemes(theme);
        }
    }

    const getSubThemes = async (theme) => {
        setSubThemesIsLoading(true);
        const response = await getSubThemesByTheme(theme);
        setSubThemesIsLoading(false);

        if(!response){
            return;
        }
        
        setSubThemes(response);
        setSubThemesFilter(response);
    }

    const resetFilter = () => {
        setSubject();
        setTheme();
        setSubTheme();
        setUser();
        setVerify();
        loadTasks(0, 5, "", "", "", "", "", true);
        setTasksFilter(false);
    }

    const applyFilters = () => {
        loadTasks(0, 5, subject, "", "", verify, user, true);
        setTasksFilter(false);
    }

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
        loadTasks(0, 5, subject, theme, subTheme, verify, user);
    }, []);

    React.useEffect(() => {
        if(tasks?.tasks?.length === 0 && !tasks?.isLast){
            loadMoreTasks();
        }
    }, [tasks?.tasks, tasks?.isLast]);

    React.useEffect(() => {
        if(subject){
            setTheme();
            setThemes([]);
            setSubTheme();
            setSubThemes([]);
        }
    }, [subject]);

    React.useEffect(() => {
        if(theme){
            setSubTheme();
            setSubThemes([]);
        }
    }, [theme]);

    return (
        <>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <p className={typography.h3}>Задания {!tasksIsLoading && `(${tasks.totalCount || 0})`}</p>

                        <ReloadButton loading={tasksIsLoading} onClick={() => loadTasks(0, 5, subject, theme, subTheme, verify, user, true)} />
                    </div>

                    <div className={base.titleWrapper}>
                        <IconButton small type="light" onClick={() => setTasksFilter(true)}>
                            <Filter />
                        </IconButton>

                        {checkPermission(currentUser?.permissions, [PERMISSIONS.CREATE_TASKS]) && <Button type="light" small auto to="task/create" disabled={tasksIsLoading}>
                            Создать
                        </Button>}
                    </div>
                </div>

                <BlockDataWithPaggination
                    error={error}
                    dataIsLoading={tasksIsLoading}
                    dataMoreIsLoading={tasksMoreLoading}
                    dataLength={tasks?.tasks?.length}
                    Skeleton={TaskItemSkeleton}
                    skeletonLoading={2}
                    skeletonMoreLoading={1}
                    containerClassName={base.contentItems}
                    errorContent={<NotContent text="Ошибка при загрузке заданий" icon={<Cross />} danger />}
                    notContent={<NotContent text="Заданий не найдено" />}
                    isLast={tasks?.isLast}
                    loadMoreData={loadMoreTasks}
                >
                    {tasks?.tasks?.map((data, id) => 
                        <TaskItem
                            key={id}
                            data={data}
                            deleteTask={() => removeTask(data.id)}
                            verifyTask={() => verifyTask(data.id)}
                            loading={taskIsLoading.includes(data.id)}
                            edit={checkPermission(user?.permissions, [PERMISSIONS.UPDATE_TASKS])}
                            remove={checkPermission(user?.permissions, [PERMISSIONS.DELETE_TASKS])}
                            verify={checkPermission(user?.permissions, [PERMISSIONS.VERIFY_TASKS])}
                        />
                    )}
                </BlockDataWithPaggination>
            </div>

            <Modal value={tasksFilter} setValue={setTasksFilter} title="Фильтры" size="small">
                <Select
                    placeholder="Предмет"
                    notContentText="Предметов не найдено"
                    loading={subjectsIsLoading}
                    onDropdownVisibleChange={subjectsDropdown}
                    value={subject}
                    onChange={value => {
                        setSubject(value);
                        setSubjectsFilter(subjects);
                    }}
                    options={subjectsFilter?.map(data => {
                        return {
                            label: data.subject,
                            value: data.id
                        }
                    })}
                    showSearch
                    onSearch={handleSearchSubject}
                    filterOption={false}
                />

                {subject && <Select
                    placeholder="Номер задания"
                    notContentText="Заданий не найдено"
                    loading={themesIsLoading}
                    onDropdownVisibleChange={themeDropdown}
                    value={theme}
                    onChange={value => {
                        setTheme(value);
                        setThemesFilter(themes);
                    }}
                    options={themesFilter?.map(data => {
                        return {
                            label: `${data.number}. ${data.theme}`,
                            value: data.id
                        }
                    })}
                    showSearch
                    onSearch={handleSearchThemes}
                    filterOption={false}
                />}

                {theme && <Select 
                    placeholder="Тема"
                    notContentText="Тем не найдено"
                    loading={subThemesIsLoading}
                    onDropdownVisibleChange={subThemeDropdown}
                    value={subTheme}
                    onChange={value => {
                        setSubTheme(value);
                        setSubThemesFilter(subThemes);
                    }}
                    options={subThemesFilter?.map(data => {
                        return {
                            label: data.subTheme,
                            value: data.id
                        }
                    })}
                    showSearch
                    onSearch={handleSearchSubThemes}
                    filterOption={false}
                />}

                <Select
                    placeholder="Проверенные"
                    onChange={value => setVerify(value)}
                    value={verify}
                    options={[
                        {
                            label: "Да",
                            value: true
                        },
                        {
                            label: "Нет",
                            value: false
                        }
                    ]}
                />

                <Select
                    placeholder="Пользователь"
                    loading={searchUsersLoading}
                    showSearch
                    notContentText="Пользователей не найдено"
                    onSearch={value => setUserSearchValue(value.trim())}
                    onDropdownVisibleChange={dropdownUsers}
                    onChange={value => setUser(value)}
                    filterOption={false}
                    value={user}
                    allowClear
                    options={userOptions.map(data => {
                        return {
                            label: data.nickname,
                            value: data.id
                        }
                    })}
                />

                <Button type="empty" onClick={resetFilter}>
                    Сбросить
                </Button>

                <Button onClick={applyFilters}>
                    Применить
                </Button>
            </Modal>
        </>
    )
}

export default Subjects;