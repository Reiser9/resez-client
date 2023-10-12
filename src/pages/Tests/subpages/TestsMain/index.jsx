import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross, Stack, TypesTest } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import Button from '../../../../components/Button';
import TestItem from '../../../../components/TestItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import TestSkeleton from '../../../../components/Skeleton/TestItem';
import NotContent from '../../../../components/NotContent';
import ReloadButton from '../../../../components/ReloadButton';
import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import InfoBlock from '../../../../components/InfoBlock';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';

const TestMain = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);
    const [testsThree, setTestsThree] = React.useState([]);

    const {isAuth} = useSelector(state => state.auth);
    const {testsIsLoading, tests} = useSelector(state => state.test);
    const {error, subjectIsLoading, getShortSubjects, loadTests, removeTest} = useTest();

    React.useEffect(() => {
        setSubjectsIsLoading(true);
        getShortSubjects().then(subjects => {
            setSubjectsIsLoading(false);
            if(!subjects){
                return;
            }

            setSubjects(subjects);
        });
    }, []);

    React.useEffect(() => {
        loadTests(0, 6);
    }, []);

    React.useEffect(() => {
        if(tests.tests){
            const firstThree = tests.tests.slice(0, 3);
            setTestsThree(firstThree);
        }
    }, [tests]);

    return (
        <div className={base.baseWrapperGap16}>
            {subjects?.length > 0 && (subjectsIsLoading
            ? <ScrollSkeleton />
            : <ScrollWithArrows>
                {subjects?.map(data => <Link key={data.id} to={`subject/${data.id}`} className={base.tag}>{data.subject}</Link>)}
            </ScrollWithArrows>)}

            <InfoBlock
                icon={<Stack />}
                title="Создайте свой вариант из заданных заданий"
                text="Пройдите или создайте свой уникальный тест, выбирая задания из предложенных вариантов. Узнайте свой уровень знаний, составляя набор заданий, который соответствует вашим интересам и целям. Начните свой путь к успеху уже сегодня!"
                button={isAuth
                    ? <Button to="create" auto type="light" small className={styles.testWelcomeButton}>
                        Создать вариант
                    </Button>
                    : <Button to="/login" auto type="light" small className={styles.testWelcomeButton}>
                        Авторизуйтесь
                    </Button>}
                image={<TypesTest />}
            />

            <div className={`${base.baseWrapperGap16} ${styles.testBlock}`}>
                <p className={typography.h3}>Рекомендованные тесты</p>

                <div className={base.contentItems}>
                    <TestItem data={{subject: "Английский язык"}} />
                </div>
            </div>

            <div className={`${base.baseWrapperGap16} ${styles.testBlock}`}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <p className={typography.h3}>Мои тесты {!testsIsLoading && `(${testsThree?.length})`}</p>

                        <ReloadButton loading={testsIsLoading} onClick={() => loadTests(0, 6, true)} />
                    </div>

                    {!testsIsLoading && (testsThree?.length > 0 ? <Button auto type="light" to="my">
                        Смотреть все
                    </Button>
                    : <Button auto type="light" to="create">
                        Создать
                    </Button>)}
                </div>

                <BlockDataWithPaggination
                    error={error}
                    dataIsLoading={testsIsLoading}
                    dataLength={testsThree?.length}
                    Skeleton={TestSkeleton}
                    skeletonLoading={3}
                    containerClassName={base.contentItems}
                    errorContent={<NotContent text="Ошибка при загрузке тестов" icon={<Cross />} danger />}
                    notContent={<NotContent text={"Тестов не найдено"} />}
                >
                    <div className={base.contentItems}>
                        {testsThree
                        ?.map(data => <TestItem
                            key={data.id}
                            data={data}
                            loading={subjectIsLoading.includes(data.id)}
                            deleteCallback={() => removeTest(data.id)}
                        />)}
                    </div>
                </BlockDataWithPaggination>
            </div>
        </div>
    )
}

export default TestMain;