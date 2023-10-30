import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross, Stack, Tests, TypesTest } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import Button from '../../../../components/Button';
import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import InfoBlock from '../../../../components/InfoBlock';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';
import CatalogItem from '../../../../components/CatalogItem';
import NotContent from '../../../../components/NotContent';
import TestItem from '../../../../components/TestItem';
import TestItemSkeletion from '../../../../components/Skeleton/TestItem';
import CatalogItemSkeleton from '../../../../components/Skeleton/CatalogItem';

const TestMain = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    const {isAuth} = useSelector(state => state.auth);
    const {taskCatalogIsLoading, taskCatalog} = useSelector(state => state.admin);
    const {testsRecommendedIsLoading, testsRecommended} = useSelector(state => state.test);
    const {error, getShortSubjects, getTasksBySubject, loadTestsOfficialBySubjectId} = useTest();

    const navigate = useNavigate();
    const {subject} = useParams();

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
        if(subject){
            getTasksBySubject(subject, () => navigate("/tests", {replace: true}));
            loadTestsOfficialBySubjectId(subject, 0, 6, true);
        }
    }, [subject]);

    React.useEffect(() => {
        if(!subject && subjects?.length > 0){
            navigate(`/tests/subject/${subjects[0].id}`, {replace: true});
        }
    }, [subject, subjects]);

    return (
        <div className={base.baseWrapperGap16}>
            {subjectsIsLoading
            ? <ScrollSkeleton />
            : subjects?.length > 0 && <ScrollWithArrows>
                {subjects?.map(data => <Link key={data.id} to={`/tests/subject/${data.id}`} replace className={`${base.tag}${subject == data.id ? ` ${base.active}` : ""}`}>{data.subject}</Link>)}
            </ScrollWithArrows>}

            <InfoBlock
                icon={<Stack />}
                title="Создайте свой вариант из заданных заданий"
                text="Пройдите или создайте свой уникальный тест, выбирая задания из предложенных вариантов. Узнайте свой уровень знаний, составляя набор заданий, который соответствует вашим интересам и целям. Начните свой путь к успеху уже сегодня!"
                button={isAuth
                    ? <Button to="/tests/my/create" auto type="light" small className={styles.testWelcomeButton}>
                        Создать вариант
                    </Button>
                    : <Button to="/login" auto type="light" small className={styles.testWelcomeButton}>
                        Авторизуйтесь
                    </Button>}
                image={<TypesTest />}
            />

            <div className={base.baseWrapperGap12}>
                <div className={base.titleInner}>
                    <p className={typography.h4}>Варианты от ResEz</p>

                    {testsRecommended?.tests?.length > 3 && <Button auto small type="light" to={`/tests/recommended/${subject}`}>
                        Смотреть все
                    </Button>}
                </div>

                <div className={base.contentItems}>
                    {(testsRecommendedIsLoading || subjectsIsLoading)
                    ? [...Array(3)].map((_, id) => <TestItemSkeletion key={id} />)
                    : testsRecommended?.tests?.length > 0
                    ? testsRecommended?.tests?.slice(0, 3).map(data => <TestItem
                        key={data.id}
                        data={data}
                    />)
                    : <NotContent text="Вариантов не найдено" icon={<Tests />} />}
                </div>
            </div>
            
            <div className={base.baseWrapperGap12}>
                <p className={typography.h4}>Каталог заданий</p>

                <div className={base.contentItems}>
                    {(taskCatalogIsLoading || subjectsIsLoading)
                    ? [...Array(4)].map((_, id) => <CatalogItemSkeleton key={id} />)
                    : error
                        ? <NotContent text="Ошибка при загрузке тестов" danger icon={<Cross />} />
                        : taskCatalog.length > 0
                        ? taskCatalog?.map(data => <CatalogItem key={data.id} data={data} />)
                        : <NotContent text="Заданий не найдено" />}
                </div>
            </div>
        </div>
    )
}

export default TestMain;