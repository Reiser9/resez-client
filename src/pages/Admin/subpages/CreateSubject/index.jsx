import React from 'react';
import { Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Delete, Plus } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';
import useAlert from '../../../../hooks/useAlert';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import IconButton from '../../../../components/IconButton';

const CreateSubject = ({edit = false}) => {
    const [name, setName] = React.useState("");
    const [isPublished, setIsPublished] = React.useState(false);

    const [tasks, setTasks] = React.useState([]);

    const [theme, setTheme] = React.useState("");
    const [primaryScore, setPrimaryScore] = React.useState("");
    const [isDetailedAnswer, setIsDetailedAnswer] = React.useState(false);
    const [subThemes, setSubThemes] = React.useState([]);

    const [subTheme, setSubTheme] = React.useState("");

    const {isLoading, createSubject, getSubjectById} = useTest();
    const {alertNotify} = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    // Рефакторить!!!!!!!
    const createSubjectHandler = () => {
        let updatedTasks = [...tasks];

        if(theme && primaryScore && (subThemes.length > 0 || subTheme)){
            const trimSubTheme = subTheme.trim();

            updatedTasks = [...updatedTasks, {
                theme,
                primaryScore,
                isDetailedAnswer,
                subThemes: trimSubTheme ? [...subThemes, trimSubTheme] : subThemes
            }]
        }

        createSubject(name, isPublished, updatedTasks, () => navigate("../test"));
    }

    const editSubjectHandler = () => {
        // Редактирование
    }

    const addTask = () => {
        if(!theme){
            return alertNotify("Предупреждение", "Тема задания не может быть пустой", "warn");
        }
        else if(!primaryScore){
            return alertNotify("Предупреждение", "Первичные баллы задания не могут быть пустыми", "warn");
        }
        else if(subThemes.length === 0 && !subTheme){
            return alertNotify("Предупреждение", "Подтемы задания не могут быть пустыми", "warn");
        }

        const trimSubTheme = subTheme.trim();

        const newTask = {
            theme,
            primaryScore,
            isDetailedAnswer,
            subThemes: trimSubTheme ? [...subThemes, trimSubTheme] : subThemes
        };

        setTasks(prev => [...prev, newTask]);

        setTheme("");
        setPrimaryScore("");
        setIsDetailedAnswer(false);
        setSubThemes([]);
        setSubTheme("");
    }

    const removeTask = (id) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(id, 1);
        setTasks(updatedTasks);
    }
    
    const updateCreatedTask = (id, key, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[id][key] = value;

        setTasks(updatedTasks);
    }

    const addCreatedSubTheme = (id) => {
        const updatedSubThemes = [...tasks];
        const temp = updatedSubThemes[id].subThemes;
        updatedSubThemes[id].subThemes = [...temp, ""];
        setTasks(updatedSubThemes);
    }

    const updateCreatedSubTheme = (taskId, themeId, value) => {
        const updatedSubThemes = [...tasks];
        updatedSubThemes[taskId].subThemes[themeId] = value;
        setTasks(updatedSubThemes);
    }

    const deleteCreatedSubTheme = (taskId, themeId) => {
        const updatedSubThemes = [...tasks];
        updatedSubThemes[taskId].subThemes.splice(themeId, 1);
        setTasks(updatedSubThemes);
    }

    const updateSubTheme = (id, value) => {
        const subthemes = [...subThemes];
        subthemes[id] = value;
        setSubThemes(subthemes);
    }

    const addSubTheme = () => {
        setSubThemes(prev => [...prev, subTheme]);
        setSubTheme("");
    }

    const deleteSubTheme = (id) => {
        const updatedSubThemes = [...subThemes];
        updatedSubThemes.splice(id, 1);
        setSubThemes(updatedSubThemes);
    }

    React.useEffect(() => {
        if(edit && id){
            getSubjectById(id);
        }
    }, [id, edit]);

    return (
        <CreatePageDefault title={`${edit ? "Редактирование" : "Создание"} предмета`}>
            <div className={base.formMedium}>
                <Input value={name} setValue={setName} title="Название предмета" trackLength lengthLimit={75} />

                <Checkbox checked={isPublished} onChange={e => setIsPublished(e.target.checked)}>
                    Опубликовать
                </Checkbox>

                <div className={styles.subjectTasksInner}>
                    <p className={typography.text2}>Задания: {tasks.length + 1}</p>

                    <div className={styles.subjectTasksContent}>
                        {tasks.map((task, taskId) => (
                            <div className={styles.subjectTaskItem} key={taskId}>
                                <div className={styles.subjectTaskItemDelete}>
                                    <p className={styles.subjectTaskNum}>{taskId + 1}</p>

                                    <IconButton type="danger" small onClick={() => removeTask(taskId)}>
                                        <Delete />
                                    </IconButton>
                                </div>

                                <Input
                                    value={task.theme}
                                    onChange={e => updateCreatedTask(taskId, "theme", e.target.value)}
                                    title="Тема задания"
                                    trackLength
                                    lengthLimit={75}
                                />

                                <Input
                                    value={task.primaryScore}
                                    onChange={e => updateCreatedTask(taskId, "primaryScore", e.target.value)}
                                    title="Первичный балл"
                                    trackLength
                                    lengthLimit={2}
                                />

                                <Checkbox checked={task.isDetailedAnswer} onChange={e => updateCreatedTask(taskId, "isDetailedAnswer", e.target.checked)}>
                                    Развернутый ответ
                                </Checkbox>

                                {task.subThemes.map((theme, subThemeId) => <div className={styles.subjectItemDeleteInner} key={subThemeId}>
                                    <Input
                                        value={theme}
                                        onChange={e => updateCreatedSubTheme(taskId, subThemeId, e.target.value)}
                                        title="Подтема"
                                        trackLength
                                        lengthLimit={75}
                                    />
                                    
                                    {subThemeId === 0
                                    ? <IconButton type="danger" disabled>
                                        <Delete />
                                    </IconButton>
                                    : <IconButton type="danger" onClick={() => deleteCreatedSubTheme(taskId, subThemeId)}>
                                        <Delete />
                                    </IconButton>}
                                </div>)}

                                <Button auto type="empty" className={styles.subjectTaskAdd} onClick={() => addCreatedSubTheme(taskId, "subThemes")}>
                                    <Plus />

                                    Подтема
                                </Button>
                            </div>
                        ))}

                        <div className={styles.subjectTaskItem}>
                            <p className={styles.subjectTaskNum}>{tasks.length + 1}</p>

                            <Input
                                value={theme}
                                setValue={setTheme}
                                title="Тема задания"
                                trackLength
                                lengthLimit={75}
                            />

                            <Input
                                value={primaryScore}
                                setValue={setPrimaryScore}
                                title="Первичный балл"
                                trackLength
                                lengthLimit={2}
                            />

                            <Checkbox checked={isDetailedAnswer} onChange={e => setIsDetailedAnswer(e.target.checked)}>
                                Развернутый ответ
                            </Checkbox>

                            {subThemes.map((subTheme, id) => <div className={styles.subjectItemDeleteInner} key={id}>
                                <Input
                                    value={subTheme}
                                    onChange={e => updateSubTheme(id, e.target.value)}
                                    title="Подтема"
                                    trackLength
                                    lengthLimit={75}
                                />

                                <IconButton type="danger" onClick={() => deleteSubTheme(id)}>
                                    <Delete />
                                </IconButton>
                            </div>)}

                            <div className={styles.subjectItemDeleteInner}>
                                <Input
                                    value={subTheme}
                                    setValue={setSubTheme}
                                    title="Подтема"
                                    trackLength
                                    lengthLimit={75}
                                />

                                <IconButton type="danger" disabled>
                                    <Delete />
                                </IconButton>
                            </div>

                            <Button auto type="empty" className={styles.subjectTaskAdd} onClick={addSubTheme}>
                                <Plus />

                                Подтема
                            </Button>
                        </div>

                        <Button auto type="empty" className={styles.subjectTaskAdd} onClick={addTask}>
                            <Plus />

                            Добавить задание
                        </Button>
                    </div>
                </div>

                {edit
                ? <Button type="light" auto onClick={editSubjectHandler} loading={isLoading}>
                    Сохранить
                </Button>
                : <Button type="light" auto onClick={createSubjectHandler} loading={isLoading}>
                    Создать
                </Button>}
            </div>
        </CreatePageDefault>
    )
}

export default CreateSubject;