import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import useTest from '../../../../hooks/useTest';

import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import Spoiler from '../../../../components/Spoiler';
import Table from '../../../../components/Table';
import TableItem from '../../../../components/Table/TableItem';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';
import Preloader from '../../../../components/Preloader';

const Points = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    const {getPointsBySubjectId, getShortSubjects} = useTest();
    const {id} = useParams();
    const {tableIsLoading, tableInfo} = useSelector(state => state.info);

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
            getPointsBySubjectId(id);
        }
    }, [id]);
    
    if(tableIsLoading){
        return <Preloader page />
    }

    return (
        <div className={base.baseWrapperGap24}>
            {subjects?.length > 0 && (subjectsIsLoading
            ? <ScrollSkeleton />
            : <ScrollWithArrows>
                {subjects?.map(data => <Link key={data.id} to={`/info/points/${data.id}`} className={`${base.tag}${id == data.id ? ` ${base.active}` : ""}`}>{data.subject}</Link>)}
            </ScrollWithArrows>)}

            {id && <>
                <div className={styles.pointsTextInner}>
                    <p className={`${styles.pointsText} ${styles.pointsTextRed}`}>Красным обозначен минимальный порог для получения аттестата</p>
                    <p className={`${styles.pointsText} ${styles.pointsTextGreen}`}>Зелёным отмечена область, в которой ученик получает оценку "отлично"</p>
                </div>

                <div className={styles.pointContent}>
                    <div className={styles.pointWrapper}>
                        <Spoiler title="Перевод баллов">
                            <Table>
                                <TableItem head text="Первичный балл" value="Вторичный балл" />

                                {tableInfo?.scoreConversion?.map(data => <TableItem
                                    key={data}
                                    text={data.primaryScore}
                                    value={data.secondaryScore}
                                    success={data.isGreen}
                                    error={data.isRed}
                                />)}
                            </Table>
                        </Spoiler>
                    </div>

                    <div className={styles.pointWrapper}>
                        <Spoiler title="Оценка заданий">
                            <Table>
                                <TableItem head text="Задание" value="Первичный балл" />

                                {tableInfo?.subjectTasks?.map(data => <TableItem
                                    key={data}
                                    text={data.number}
                                    value={data.primaryScore}
                                />)}
                            </Table>
                        </Spoiler>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Points;