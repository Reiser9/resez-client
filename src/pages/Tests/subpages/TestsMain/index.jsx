import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Stack, TypesTest } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import Button from '../../../../components/Button';
import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import InfoBlock from '../../../../components/InfoBlock';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';
import CatalogItem from '../../../../components/CatalogItem';
import Preloader from '../../../../components/Preloader';

const TestMain = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    const {isAuth} = useSelector(state => state.auth);
    const {taskCatalogIsLoading, taskCatalog} = useSelector(state => state.admin);
    const {error, subjectIsLoading, getShortSubjects, getTasksBySubject} = useTest();

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

            {taskCatalogIsLoading
            ? <Preloader />
            : <div className={base.baseWrapperGap12}>
                <p className={typography.h4}>Каталог заданий</p>

                <div className={base.contentItems}>
                    {taskCatalog?.map(data => <CatalogItem key={data.id} data={data} />)}
                </div>
            </div>}
        </div>
    )
}

export default TestMain;