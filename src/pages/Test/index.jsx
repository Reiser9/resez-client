import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const Test = () => {
    const [step, setStep] = React.useState(1);
    const [result, setResult] = React.useState({});

    const [tasksAnswer, setTasksAnswer] = React.useState([]);

    const {id} = useParams();
    const navigate = useNavigate();
    const {isLoading, getTestById, checkTest} = useTest();
    const {test} = useSelector(state => state.test);
    const {tasks, durationMinutes, subject} = test || {};
    const {tasksWithDetailedAnswerResult, tasksWithoutDetailedAnswerResult, totalPrimaryScore, totalSecondaryScore} = result || {};
    const {remainingTime, elapsedTime, elapsed, isPaused, pauseResume} = useTimer(durationMinutes, () => {});

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

    const checkResult = async () => {
        let tasksWithDetailedAnswer, tasksWithoutDetailedAnswer;

        tasksAnswer.forEach(data => {
            if(data.isDetailedAnswer){
                return tasksWithDetailedAnswer = tasksWithDetailedAnswer ? [...tasksWithDetailedAnswer, {
                    id: data.id,
                    primaryScore: data.primaryScore
                }] : [{
                    id: data.id,
                    primaryScore: data.primaryScore
                }];
            }

            tasksWithoutDetailedAnswer = tasksWithoutDetailedAnswer ? [...tasksWithoutDetailedAnswer, {
                id: data.id,
                answer: data.answer
            }] : [{
                id: data.id,
                answer: data.answer
            }];
        });

        const result = await checkTest(id, elapsed, tasksWithoutDetailedAnswer, tasksWithDetailedAnswer, () => setStep(prev => prev + 1));
        setResult(result);
        console.log(result);
    }

    React.useEffect(() => {
        if(tasks){
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
        <TitleWrapper pageTitle="ResEz - Решение теста">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={styles.taskInner}>
                            <div className={styles.taskContent}>
                                {step === 1 && tasksAnswer?.map((data, id) => <TaskTestItem key={id} test data={data} value={data.answer} setValue={setAnswerHandler} />)}
                                {step === 2 && "Второй этап"}
                                {step === 3 && <div className={styles.testResult}>
                                    <p className={styles.testResultTitle}>Вы набрали <span>{totalSecondaryScore}</span> из <span>100</span> баллов</p>

                                    <div className={styles.testResultWrapper}>
                                        <p className={styles.testResultSubtitle}>Тестовая часть</p>

                                        <Table>
                                            <TableItem head id="Задание" text="Ваш ответ" value="Правильный ответ" />

                                            {tasksWithoutDetailedAnswerResult?.map(data => <TableItem
                                                key={data.id}
                                                id={data.id}
                                                text={data.answer || "-"}
                                                value={data.correctAsnwer}
                                                status={data.isCorrect ? "success" : "error"}
                                            />)}
                                        </Table>
                                    </div>

                                    <div className={styles.testResultWrapper}>
                                        <p className={styles.testResultSubtitle}>Развёрнутый ответ</p>

                                        <Table>
                                            <TableItem head text="Ваш балл" value="Максимальный балл" />

                                            {tasksWithDetailedAnswerResult?.map(data => <TableItem
                                                key={data.id}
                                                text={`${data.primaryScore}`}
                                                value={data.maxPrimaryScore}
                                                status={data.primaryScore === data.maxPrimaryScore ? "success" : data.primaryScore === 0 ? "error" : "warn"}
                                            />)}
                                        </Table>
                                    </div>
                                </div>}

                                {step < 3 && <div className={styles.taskTestButtons}>
                                    {step > 1 && <Button auto type="light" onClick={() => setStep(prev => prev - 1)}>
                                        Назад
                                    </Button>}

                                    {step === 1 && <Button auto onClick={() => {
                                        if(!isPaused){
                                            pauseResume();
                                        }

                                        setStep(prev => prev + 1);
                                    }}>
                                        Далее
                                    </Button>}

                                    {step === 2 && <Button auto onClick={checkResult}>
                                        К результату
                                    </Button>}
                                </div>}
                            </div>

                            <InnerSidebar icon={<Info />} className={styles.taskSidebar} big>
                                <div className={styles.testInfoWrapper}>
                                    <TextPoint title="Прошло:" className={styles.testInfoItem}>
                                        <p className={typography.h4}>{elapsedTime}</p>
                                    </TextPoint>

                                    <TextPoint title="Осталось:" className={styles.testInfoItem}>
                                        <p className={typography.h4}>{remainingTime}</p>
                                    </TextPoint>
                                </div>

                                <TextPoint title="Экзамен длится:">
                                    <p className={typography.h4}>{formatMinutesToDuration(durationMinutes)}</p>
                                </TextPoint>

                                <TextPoint title="Предмет:">
                                    <p className={typography.h4}>{subject}</p>
                                </TextPoint>

                                {step === 1 && <div className={styles.testInfoButtons}>
                                    <button className={styles.testInfoButton} onClick={pauseResume}>
                                        {!isPaused ? <Pause /> : <Play />}

                                        {!isPaused ? "Пауза" : "Продолжить"}
                                    </button>

                                    <button className={`${styles.testInfoButton} ${styles.danger}`}>
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
    )
}

export default Test;