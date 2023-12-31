import React from 'react';
import { Checkbox, Steps, Tooltip } from 'antd';
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
import Table from '../../../../components/Table';
import CreateTableItem from './CreateTableItem';
import Preloader from '../../../../components/Preloader';

const CreateSubject = ({edit = false}) => {
    const [name, setName] = React.useState("");
    const [examMinutes, setExamMinutes] = React.useState("");
    const [isPublished, setIsPublished] = React.useState(false);
    const [isPoint, setIsPoint] = React.useState(false);
    const [step, setStep] = React.useState(0);

    const [createdSubjectId, setCreatedSubjectId] = React.useState("");

    const [red, setRed] = React.useState(-9999);
    const [green, setGreen] = React.useState(9999);
    const [elements, setElements] = React.useState([]);

    const [primaryCount, setPrimaryCount] = React.useState(null);

    const [tasks, setTasks] = React.useState([]);

    const [theme, setTheme] = React.useState("");
    const [primaryScore, setPrimaryScore] = React.useState("");
    const [isDetailedAnswer, setIsDetailedAnswer] = React.useState(false);
    const [subThemes, setSubThemes] = React.useState([]);

    const [subTheme, setSubTheme] = React.useState("");

    const {isLoading, subjectByIdIsLoading, tableByIdIsLoading, createSubject, editSubject, createTablePoints,
        getSubjectById, getTablePointsBySubjectId, editTablePoints} = useTest();
    const {alertNotify} = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    const subjectHandler = async () => {
        let updatedTasks = [...tasks];

        if(theme && primaryScore && (subThemes.length > 0 || subTheme)){
            const trimSubTheme = subTheme.trim();

            updatedTasks = [...updatedTasks, {
                theme,
                primaryScore,
                isDetailedAnswer,
                subThemes: trimSubTheme ? [...subThemes, {subTheme: trimSubTheme}] : subThemes
            }]
        }

        if(edit){
            await editSubject(id, name, isPublished, updatedTasks, isPoint, examMinutes, () => {
                setStep(prev => prev + 1);
            });
            
            const primaryCount = updatedTasks.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.primaryScore);
            }, 0);

            setPrimaryCount(primaryCount);
        }
        else{
            const id = await createSubject(name, isPublished, updatedTasks, isPoint, examMinutes, () => {
                setStep(prev => prev + 1);
            });
            setCreatedSubjectId(id); 

            const primaryCount = updatedTasks.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue.primaryScore);
            }, 0);

            setPrimaryCount(primaryCount);
            fillEmptyTableCell(primaryCount);
        }
    }

    const tableHandler = () => {
        let empty = false, incorrectValue = false;

        let updatedScores = elements.map(data => {
            const {primaryScore, secondaryScore} = data || {};
            const isGreen = primaryScore - 1 >= green;
            const isRed = primaryScore - 1 <= red;

            if(!secondaryScore){
                empty = true;
            }

            return {
                primaryScore,
                secondaryScore,
                isGreen,
                isRed
            }
        });

        if(empty){
            return alertNotify("Предупреждение", "Таблица должна быть полностью заполненной", "warn");
        }

        if(isPoint){
            updatedScores = updatedScores.map(data => {
                const {primaryScore, secondaryScore, isGreen, isRed} = data || {};
                const score = secondaryScore.split("-");
                
                if(score.length !== 2){
                    incorrectValue = true;
                }

                return {
                    isGreen,
                    isRed,
                    grade: primaryScore + 1,
                    minScore: score[0],
                    maxScore: score[1]
                }
            });
        }

        if(incorrectValue){
            return alertNotify("Ошибка", "Баллы введены некорректно, пример ввода: 1-2", "error");
        }

        if(edit){
            editTablePoints(createdSubjectId, updatedScores, () => navigate("../test"));
        }
        else{
            createTablePoints(createdSubjectId, updatedScores, () => navigate("../test"));
        }
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
            subThemes: trimSubTheme ? [...subThemes, {subTheme: trimSubTheme}] : subThemes
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
        updatedSubThemes[id].subThemes = [...temp, {
            subTheme: ""
        }];
        setTasks(updatedSubThemes);
    }

    const updateCreatedSubTheme = (taskId, themeId, value) => {
        const updatedSubThemes = [...tasks];
        updatedSubThemes[taskId].subThemes[themeId].subTheme = value;
        setTasks(updatedSubThemes);
    }

    const deleteCreatedSubTheme = (taskId, themeId) => {
        const updatedSubThemes = [...tasks];
        updatedSubThemes[taskId].subThemes.splice(themeId, 1);
        setTasks(updatedSubThemes);
    }

    const updateSubTheme = (id, value) => {
        const subthemes = [...subThemes];
        subthemes[id].subTheme = value;
        setSubThemes(subthemes);
    }

    const addSubTheme = () => {
        const tempSubTheme = subTheme.trim();
        if(!tempSubTheme){
            return alertNotify("Предупреждение", "Подтема не может быть пустой", "warn");
        }
        
        setSubThemes(prev => [...prev, {
            subTheme: subTheme
        }]);
        setSubTheme("");
    }

    const deleteSubTheme = (id) => {
        const updatedSubThemes = [...subThemes];
        updatedSubThemes.splice(id, 1);
        setSubThemes(updatedSubThemes);
    }

    // Только если редактируем
    const getCurrentSubject = async (id) => {
        const currentSubject = await getSubjectById(id);

        if(!currentSubject){
            return navigate("/admin/test");
        }

        const {subject, isPublished, subjectTasks, isMark, durationMinutes} = currentSubject || {};

        setName(subject);
        setIsPublished(isPublished);
        setTasks([...subjectTasks]);
        setIsPoint(isMark);
        setExamMinutes(durationMinutes);

        const primaryCount = subjectTasks.reduce((accumulator, currentValue) => {
            return accumulator + parseInt(currentValue.primaryScore);
        }, 0);

        setPrimaryCount(primaryCount);
        fillEmptyTableCell(primaryCount);
    }

    // Только если редактируем
    const getCurrentTablePoint = async (id) => {
        const currentTable = await getTablePointsBySubjectId(id);

        let redId = -9999, greenId = 9999, newCurrentTable = [];

        if(isPoint){
            currentTable.forEach(element => {
                if(element.isRed && redId < element.grade - 2){
                    redId = element.grade - 2;
                }
    
                if(element.isGreen && greenId > element.grade - 2){
                    greenId = element.grade - 2;
                }
            });

            newCurrentTable = [...Array(4)].map((_, id) => {
                return {
                    id,
                    primaryScore: id + 1,
                    isRed: false,
                    isGreen: false,
                    secondaryScore: currentTable[id]?.minScore !== "undefined" ? `${currentTable[id]?.minScore || 0}-${currentTable[id]?.maxScore || 0}` : ""
                }
            });
        }
        else{
            currentTable.forEach(element => {
                if(element.primaryScore === ""){
                    return;
                }

                if(element.isRed && redId < element.primaryScore){
                    redId = element.primaryScore - 1;
                }
    
                if(element.isGreen && greenId > element.primaryScore){
                    greenId = element.primaryScore - 1;
                }
            });

            if(primaryCount >= currentTable.length){
                // Стало больше баллов
                newCurrentTable = [...Array(primaryCount)].map((_, id) => {
                    return {
                        id,
                        primaryScore: id + 1,
                        isRed: false,
                        isGreen: false,
                        secondaryScore: currentTable.length > id ? currentTable[id]?.secondaryScore : ""
                    }
                });
            }
            else{
                // Стало меньше баллов
                newCurrentTable = [...Array(primaryCount)].map((_, id) => {
                    return {
                        id,
                        primaryScore: id + 1,
                        isRed: false,
                        isGreen: false,
                        secondaryScore: currentTable[id]?.secondaryScore
                    }
                });
            }
        }

        setRed(redId);
        setGreen(greenId);
        setElements(newCurrentTable);
    }

    const setRedHandler = (id) => {
        setGreen(prev => {
            if(prev === 9999 || id + 1 === primaryCount){
                return 9999;
            }
            else if(id >= prev){
                return id + 1;
            }

            return prev;
        });

        setRed(prev => prev === id ? -9999 : id);
    }

    const setGreenHandler = (id) => {
        setRed(prev => {
            if(prev === -9999 || id === 0){
                return -9999;
            }
            else if(id <= prev){
                return id - 1;
            }

            return prev;
        });

        setGreen(prev => prev === id ? 9999 : id);
    }

    const handleChangeInput = (e, id) => {
        let currentData = [...elements];

        currentData[id].secondaryScore = e.target.value;
        setElements(currentData);
    }

    const fillEmptyTableCell = (count) => {
        let newElements = [];

        [...Array(isPoint ? 4 : count)].map((_, id) => {
            newElements = [...newElements, {
                id,
                primaryScore: id + 1,
                isRed: false,
                isGreen: false,
                secondaryScore: ""
            }];
        });

        setElements(newElements);
    }

    React.useEffect(() => {
        if(edit && id){
            if(step === 0){
                getCurrentSubject(id);
            }
            else{
                getCurrentTablePoint(id);
            }
        }
    }, [edit, id, step]);

    React.useEffect(() => {
        if(id && edit){
            setCreatedSubjectId(id);
        }
    }, [id, edit]);

    return (
        <CreatePageDefault
            title={`${edit ? "Редактирование" : "Создание"} ${step === 0 ? "предмета" : "таблицы"}`}
            button={step === 0
                ? <Button type="light" auto onClick={subjectHandler} loading={isLoading}>
                    {edit ? "Сохранить" : "Далее"}
                </Button>
                : <Button type="light" auto onClick={tableHandler} loading={isLoading}>
                    {edit ? "Сохранить" : "Создать"}
                </Button>}
        >
            <div className={base.formMedium}>
                <Steps
                    current={step}
                    size="small"
                    items={[{title: "Предмет"}, {title: "Таблица баллов"}]}
                    className={styles.subjectSteps}
                    onChange={edit ? (data) => {
                        setStep(data);
                    } : false}
                />

                {subjectByIdIsLoading
                ? <Preloader page />
                : step === 0 && <>
                    <Input value={name} setValue={setName} title="Название предмета" trackLength lengthLimit={75} />

                    <Input value={examMinutes} setValue={setExamMinutes} title="Длительность экзамена в минутах" lengthLimit={3} />

                    <Checkbox checked={isPublished} onChange={e => setIsPublished(e.target.checked)}>
                        Опубликовать
                    </Checkbox>

                    <Checkbox checked={isPoint} onChange={e => setIsPoint(e.target.checked)}>
                        Оценка
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
                                        lengthLimit={150}
                                    />

                                    <Input
                                        value={task.primaryScore}
                                        onChange={e => updateCreatedTask(taskId, "primaryScore", e.target.value)}
                                        title="Первичный балл"
                                        lengthLimit={2}
                                    />

                                    <Checkbox checked={task.isDetailedAnswer} onChange={e => updateCreatedTask(taskId, "isDetailedAnswer", e.target.checked)}>
                                        Развернутый ответ
                                    </Checkbox>

                                    {task.subThemes.map((theme, subThemeId) => <div className={styles.subjectItemDeleteInner} key={subThemeId}>
                                        <Input
                                            value={theme.subTheme}
                                            onChange={e => updateCreatedSubTheme(taskId, subThemeId, e.target.value)}
                                            title={`Подтема (${theme.tasksCount || 0})`}
                                            trackLength
                                            lengthLimit={150}
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
                                    lengthLimit={150}
                                />

                                <Input
                                    value={primaryScore}
                                    setValue={setPrimaryScore}
                                    title="Первичный балл"
                                    lengthLimit={2}
                                />

                                <Checkbox checked={isDetailedAnswer} onChange={e => setIsDetailedAnswer(e.target.checked)}>
                                    Развернутый ответ
                                </Checkbox>

                                {subThemes.map((subTheme, id) => <div className={styles.subjectItemDeleteInner} key={id}>
                                    <Input
                                        value={subTheme.subTheme}
                                        onChange={e => updateSubTheme(id, e.target.value)}
                                        title="Подтема"
                                        trackLength
                                        lengthLimit={150}
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
                                        lengthLimit={150}
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
                </>}

                {tableByIdIsLoading
                ? <Preloader page />
                : step === 1 && <Table>
                    {isPoint && <p className={styles.subjectsPointsValue}>Количество первичных баллов: {primaryCount}</p>}
                    <div className={styles.subjectPointsItem}>
                        <p className={styles.subjectPointsHead}>{isPoint ? "Оценка" : "Первичный балл"}</p>

                        <div className={styles.subjectPointsActions}></div>

                        <p className={styles.subjectPointsHead}>{isPoint ? "Баллы" : "Вторичный балл"}</p>
                    </div>

                    {elements?.map((data, id) => <CreateTableItem
                        key={id}
                        data={data}
                        red={red}
                        id={id}
                        green={green}
                        callbackRed={() => setRedHandler(id)}
                        callbackGreen={() => setGreenHandler(id)}
                        onChange={handleChangeInput}
                        isPoint={isPoint}
                    />)}
                </Table>}
            </div>
        </CreatePageDefault>
    )
}

export default CreateSubject;