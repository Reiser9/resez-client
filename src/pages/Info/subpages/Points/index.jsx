import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import { Tests } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import Spoiler from '../../../../components/Spoiler';
import Table from '../../../../components/Table';
import TableItem from '../../../../components/Table/TableItem';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';
import Preloader from '../../../../components/Preloader';
import NotContent from '../../../../components/NotContent';

const Points = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    const {getPointsBySubjectId, getShortSubjects} = useTest();
    const {id} = useParams();
    const {tableIsLoading, tableInfo} = useSelector(state => state.info);
    const navigate = useNavigate();

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
        if(id){
            getPointsBySubjectId(id, () => navigate("/info", {replace: true}));
        }
    }, [id]);

    React.useEffect(() => {
        if(!id && subjects?.length > 0){
            navigate(`/info/points/${subjects[0].id}`, {replace: true});
        }
    }, [id, subjects]);

    return (
        <div className={base.baseWrapperGap24}>
            {subjectsIsLoading
            ? <ScrollSkeleton />
            : subjects?.length > 0 && <ScrollWithArrows>
                {subjects?.map(data => <Link key={data.id} to={`/info/points/${data.id}`} replace className={`${base.tag}${id == data.id ? ` ${base.active}` : ""}`}>{data.subject}</Link>)}
            </ScrollWithArrows>}

            {tableIsLoading || subjectsIsLoading
            ? <Preloader page />
            : id ? <>
                <div className={styles.pointsTextInner}>
                    <p className={`${styles.pointsText} ${styles.pointsTextRed}`}>Красным обозначен минимальный порог для получения аттестата</p>
                    <p className={`${styles.pointsText} ${styles.pointsTextGreen}`}>Зелёным отмечена область, в которой ученик получает оценку "отлично"</p>
                </div>

                <div className={styles.pointContent}>
                    {tableInfo?.scoreConversion?.length > 0 && <div className={styles.pointWrapper}>
                        <Spoiler title="Перевод баллов">
                            <Table>
                                <TableItem head text={tableInfo?.isMark ? "Оценка" : `Первичный балл`} value={tableInfo?.isMark ? "Балл" : `Вторичный балл`} />

                                {tableInfo?.scoreConversion?.map(data => <TableItem
                                    key={data.id}
                                    text={data.primaryScore ? data.primaryScore : data.grade}
                                    value={data.secondaryScore ? data.secondaryScore : `${data.minScore}-${data.maxScore}`}
                                    status={data.isGreen ? "success" : data.isRed ? "error" : ""}
                                />)}
                            </Table>
                        </Spoiler>
                    </div>}

                    {tableInfo?.subjectTasks?.length > 0 && <div className={styles.pointWrapper}>
                        <Spoiler title="Оценка заданий">
                            <Table>
                                <TableItem head text="Задание" value="Первичный балл" />

                                {tableInfo?.subjectTasks?.map(data => <TableItem
                                    key={data.id}
                                    text={data.number}
                                    value={data.primaryScore}
                                />)}
                            </Table>
                        </Spoiler>
                    </div>}
                </div>
            </>
            : subjects.length <= 0 && <NotContent text="Предметов не найдено" icon={<Tests />} />}
        </div>
    )
}

export default Points;