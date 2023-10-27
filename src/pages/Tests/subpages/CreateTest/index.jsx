import React from 'react';
import { Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import useTest from '../../../../hooks/useTest';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import AuthWrapper from '../../../../components/Wrapper/AuthWrapper';
import GenerateTestItem from '../../../../components/GenerateTestItem';

const CreateTest = ({
    edit = false
}) => {
    const [subject, setSubject] = React.useState();
    const [generateVariant, setGenerateVariant] = React.useState(false);
    const [isPrivate, setIsPrivate] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);
    const [subjectTasks, setSubjectTasks] = React.useState([]);

    const [subjects, setSubjects] = React.useState([]);
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [tasksIsLoading, setTasksIsLoading] = React.useState(false); //Для подгрузки заданий

    const {isLoading, getShortSubjects, createTest, createCustomTest, getTasksBySubject} = useTest();
    const navigate = useNavigate();

    const subjectsDropdown = (open) => {
        if(open && subjects.length === 0){
            setSubjectsIsLoading(true);
            getShortSubjects().then(subjects => {
                setSubjectsIsLoading(false);
                if(!subjects){
                    return;
                }
    
                setSubjects(subjects);
            });
        }
    }

    const createTestHandler = () => {
        if(generateVariant){
            createTest(subject, isPrivate, () => {
                navigate("../my");
            });
        }
        else{
            createCustomTest(subject, isPrivate, subjectTasks, () => {
                navigate("../my");
            });
        }
    }

    const getTasksHandler = async () => {
        setTasksIsLoading(true);
        const tasks = await getTasksBySubject(subject, () => navigate("/tests", {replace: true}), true);
        setTasksIsLoading(false);

        const formatedTasks = tasks.map(data => {
            return {
                id: data.id,
                count: 0,
                subThemes: []
            }
        });

        setTasks(tasks);
        setSubjectTasks(formatedTasks);
    }

    const setSubThemesHandler = (taskId, subThemeId) => {
        setSubjectTasks(prev => prev.map(data => {
            if(data.id === taskId){
                let currentSubThemes = [...data.subThemes];
                if(data.subThemes.includes(subThemeId)){
                    currentSubThemes = currentSubThemes.filter(elem => elem !== subThemeId);
                }
                else{
                    currentSubThemes = [...currentSubThemes, subThemeId];
                }

                return{
                    ...data,
                    subThemes: currentSubThemes
                }
            }

            return data;
        }));
    }

    const setCountTasksHandler = (taskId, count) => {
        setSubjectTasks(prev => prev.map(data => {
            if(data.id === taskId){
                return{
                    ...data,
                    count
                }
            }

            return data;
        }));
    }

    React.useEffect(() => {
        if(subject){
            getTasksHandler();
        }
    }, [subject]);

    return (
        <AuthWrapper>
            <CreatePageDefault
                title={`${edit ? "Редактирование" : "Создание"} теста`}
                button={edit
                    ? <Button type="light" auto loading={isLoading}>
                        Сохранить
                    </Button>
                    : <Button type="light" auto onClick={createTestHandler} loading={isLoading}>
                        Создать
                    </Button>}
            >
                <div className={base.formMedium}>
                    <Select
                        placeholder="Предмет"
                        notContentText="Предметов не найдено"
                        loading={subjectsIsLoading}
                        onDropdownVisibleChange={subjectsDropdown}
                        value={subject}
                        onChange={value => setSubject(value)}
                        options={subjects?.map(data => {
                            return {
                                label: data.subject,
                                value: data.id
                            }
                        })}
                    />

                    {subject && <>
                        <Checkbox checked={generateVariant} onChange={e => setGenerateVariant(e.target.checked)}>
                            Сгенерировать вариант ЕГЭ
                        </Checkbox>

                        <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
                            Скрыть от других пользователей
                        </Checkbox>

                        {!generateVariant && <div className={styles.generateForm}>
                            {tasks?.map(data => <GenerateTestItem
                                key={data.id}
                                data={data}
                                setSubThemes={setSubThemesHandler}
                                setCountTasks={setCountTasksHandler}
                            />)}
                        </div>}
                    </>}
                </div>
            </CreatePageDefault>
        </AuthWrapper>
    )
}

export default CreateTest;