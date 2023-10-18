import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Slider } from 'antd';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { Info, Pause, Play, Reload } from '../../components/Icons';

import {formatMinutesToDuration} from '../../utils/formatMinutesToDuration';

import useTest from '../../hooks/useTest';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import TextPoint from '../../components/TextPoint';
import TaskTestItem from '../../components/TaskTestItem';
import InnerSidebar from '../../components/InnerSidebar';
import Preloader from '../../components/Preloader';
import useTimer from '../../hooks/useTimer';
import Button from '../../components/Button';
import Table from '../../components/Table';
import TableItem from '../../components/Table/TableItem';
import ConfirmModal from '../../components/Modal/ConfirmModal';

const Test = () => {
    const [confirmRestart, setConfirmRestart] = React.useState(false);
    const [sidebarActive, setSidebarActive] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [result, setResult] = React.useState({});

    const [tasksDetailed, setTasksDetailed] = React.useState([]);
    const [tasksAnswer, setTasksAnswer] = React.useState([]);

    const {id} = useParams();
    const navigate = useNavigate();
    const {isLoading, getTestById, checkDetailedTasks, checkTest} = useTest();
    const {test} = useSelector(state => state.test);
    const {tasks, durationMinutes, subject} = test || {};
    const {tasksWithDetailedAnswerResult, tasksWithoutDetailedAnswerResult, totalPrimaryScore, maxPrimaryScore, totalSecondaryScore} = result || {};
    const {remainingTime, elapsedTime, elapsed, isPaused, pauseResume, restartTimer} = useTimer(durationMinutes, () => {});

    // React.useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //         e.preventDefault();
    //         e.returnValue = '';

    //         // Логика сохранения данных

    //         return '';
    //     }
    
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    const setAnswerHandler = (id, value) => {
        setTasksAnswer(prev => {
            return prev.map(task => {
                if(task.id === id){
                    return {
                        ...task,
                        answer: value
                    };
                }

                return task;
            });
        });
    }

    const handleScoreChange = (id, value) => {
        setTasksDetailed(prev => {
            return prev.map(task => {
                if(task.id === id){
                    return {
                        ...task,
                        primaryScore: value
                    };
                }

                return task;
            });
        });
    }

    const restartTest = () => {
        createTasks();
        restartTimer();
    }

    const checkDetailedTasksHandler = async () => {
        const result = await checkDetailedTasks(id);

        const currentTasks = result.map(data => {
            return {
                ...data,
                primaryScore: 0,
            }
        });

        setTasksDetailed(currentTasks);
    }

    const checkResult = async () => {
        let tasksWithDetailedAnswer, tasksWithoutDetailedAnswer;

        tasksAnswer.forEach(data => {
            if(data.isDetailedAnswer){
                return;
            }

            tasksWithoutDetailedAnswer = tasksWithoutDetailedAnswer ? [...tasksWithoutDetailedAnswer, {
                id: data.id,
                answer: data.answer
            }] : [{
                id: data.id,
                answer: data.answer
            }];
        });

        tasksDetailed.forEach(data => {
            tasksWithDetailedAnswer = tasksWithDetailedAnswer ? [...tasksWithDetailedAnswer, {
                id: data.id,
                primaryScore: data.primaryScore
            }] : [{
                id: data.id,
                primaryScore: data.primaryScore
            }]
        });

        const result = await checkTest(id, elapsed, tasksWithoutDetailedAnswer, tasksWithDetailedAnswer, () => setStep(prev => prev + 1));
        setResult(result);
    }

    const createTasks = () => {
        const currentTasks = tasks.map(data => {
            if(data.isDetailedAnswer){
                return {
                    ...data,
                    primaryScore: 0
                }
            }

            return {
                ...data,
                answer: ""
            }
        });

        setTasksAnswer(currentTasks);
    }

    React.useEffect(() => {
        if(tasks){
            createTasks();
        }
    }, [tasks]);

    React.useEffect(() => {
        if(id){
            getTestById(id, () => navigate("/tests", {replace: true}));
        }
    }, [id]);

    if(isLoading){
        return <Preloader page />
    }

    return (
        <>
            <TitleWrapper pageTitle="ResEz - Решение теста">
                <WithSidebarWrapper>
                    <div className={pws.wrapper}>
                        <div className={pws.contentFull}>
                            <div className={styles.taskInner}>
                                <div className={base.taskContent}>
                                    {step === 1 && tasksAnswer?.map((data, id) =>
                                        <TaskTestItem
                                            key={id}
                                            test
                                            data={data}
                                            value={data.answer}
                                            setValue={setAnswerHandler}
                                        />)}
                                    
                                    {step === 2 && <div className={base.baseWrapperGap20}>
                                        <p className={`${typography.h3} ${base.textCenter}`}>
                                            Проверка заданий с развёрнутым ответом
                                        </p>

                                        {tasksDetailed?.map(data => <div key={data.id} className={base.baseWrapperGap20}>
                                            <TaskTestItem data={data} showAnswer />

                                            <div className={base.baseWrapperGap4}>
                                                <p className={typography.text2}>Оцените задание (максимум баллов за задание: {data.maxPrimaryScore})</p>

                                                <Slider
                                                    className={styles.taskSlider}
                                                    min={0}
                                                    max={data.maxPrimaryScore}
                                                    value={data.primaryScore}
                                                    onChange={value => handleScoreChange(data.id, value)}
                                                />
                                            </div>
                                        </div>)}
                                    </div>}

                                    {step === 3 && <div className={`${base.baseWrapperGap20} ${base.aic}`}>
                                        <div className={`${base.baseWrapperGap4} ${base.aic}`}>
                                            <p className={styles.testResultTitle}>Вы набрали <span>{totalSecondaryScore}</span> из <span>100</span> баллов</p>

                                            <p className={styles.testResultSubtitle}>Набрано первичных баллов: {totalPrimaryScore} из {maxPrimaryScore}</p>

                                            <p className={styles.testResultSubtitle}>Затрачено времени: {elapsedTime}</p>
                                        </div>

                                        <Button to="/tests/my" type="light" auto>
                                            Решать другие тесты
                                        </Button>

                                        <div className={styles.testResultWrapper}>
                                            <p className={styles.testResultSubtitle}>Тестовая часть</p>

                                            <Table>
                                                <TableItem head id="Задание" text="Ваш ответ" value="Правильный ответ" />

                                                {tasksWithoutDetailedAnswerResult?.map(data => <TableItem
                                                    key={data.id}
                                                    id={data.number}
                                                    text={data.answer || "-"}
                                                    value={data.correctAsnwer}
                                                    status={data.isCorrect ? "success" : "error"}
                                                />)}
                                            </Table>
                                        </div>

                                        <div className={styles.testResultWrapper}>
                                            <p className={styles.testResultSubtitle}>Развёрнутый ответ</p>

                                            <Table>
                                                <TableItem head id="Задание" text="Ваш балл" value="Максимальный балл" />

                                                {tasksWithDetailedAnswerResult?.map(data => <TableItem
                                                    key={data.id}
                                                    id={data.number}
                                                    text={`${data.primaryScore}`}
                                                    value={data.maxPrimaryScore}
                                                    status={data.primaryScore === data.maxPrimaryScore ? "success" : data.primaryScore === 0 ? "error" : "warn"}
                                                />)}
                                            </Table>
                                        </div>
                                    </div>}

                                    {step < 3 && <div className={styles.taskTestButtons}>
                                        {step > 1 && <Button auto type="light" onClick={() => {
                                            setStep(prev => prev - 1);
                                            pauseResume();
                                        }}>
                                            Назад
                                        </Button>}

                                        {step === 1 && <Button auto onClick={() => {
                                            if(!isPaused){
                                                pauseResume();
                                            }

                                            setStep(prev => prev + 1);
                                            checkDetailedTasksHandler();
                                        }}>
                                            Далее
                                        </Button>}

                                        {step === 2 && <Button auto onClick={checkResult}>
                                            К результату
                                        </Button>}
                                    </div>}
                                </div>

                                <InnerSidebar value={sidebarActive} setValue={setSidebarActive} icon={<Info />} className={styles.taskSidebar} big>
                                    {step !== 3 && <div className={styles.testInfoWrapper}>
                                        <TextPoint title="Прошло:" className={styles.testInfoItem}>
                                            <p className={typography.h4}>{elapsedTime}</p>
                                        </TextPoint>

                                        <TextPoint title="Осталось:" className={styles.testInfoItem}>
                                            <p className={typography.h4}>{remainingTime}</p>
                                        </TextPoint>
                                    </div>}

                                    <TextPoint title="Предмет:">
                                        <p className={typography.h4}>{subject}</p>
                                    </TextPoint>

                                    <TextPoint title="Экзамен длится:">
                                        <p className={typography.h4}>{formatMinutesToDuration(durationMinutes)}</p>
                                    </TextPoint>

                                    {step === 1 && <div className={styles.testInfoButtons}>
                                        <button className={styles.testInfoButton} onClick={pauseResume}>
                                            {!isPaused ? <Pause /> : <Play />}

                                            {!isPaused ? "Пауза" : "Продолжить"}
                                        </button>

                                        <button className={`${styles.testInfoButton} ${styles.danger}`} onClick={() => {
                                            setConfirmRestart(true);
                                            setSidebarActive(false);
                                        }}>
                                            <Reload />

                                            Начать заново
                                        </button>
                                    </div>}
                                </InnerSidebar>
                            </div>
                        </div>
                    </div>
                </WithSidebarWrapper>
            </TitleWrapper>

            <ConfirmModal
                value={confirmRestart}
                setValue={setConfirmRestart}
                callback={restartTest}
                text="Вы действительно хотите начать тест заново? Прогресс теста не будет сохранен"
                rejectText="Продолжить решать"
                confirmText="Начать заново"
            />
        </>
    )
}

export default Test;