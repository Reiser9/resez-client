import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import { Cross } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';
import Button from '../../../../components/Button';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import NotContent from '../../../../components/NotContent';
import TestItem from '../../../../components/TestItem';
import TestSkeleton from '../../../../components/Skeleton/TestItem';
import ReloadButton from '../../../../components/ReloadButton';

const Recommended = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [testsMoreIsLoading, setTestsMoreIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    const {error, getShortSubjects, loadTestsOfficialBySubjectId, getTestsOfficialBySubjectId} = useTest();

    const {subject} = useParams();
    const navigate = useNavigate();
    const {testsRecommendedIsLoading, testsRecommended} = useSelector(state => state.test);

    const loadMoreTests = React.useCallback(async () => {
        setTestsMoreIsLoading(true);
        await getTestsOfficialBySubjectId(subject, testsRecommended?.tests?.length, 6);
        setTestsMoreIsLoading(false);
    }, [testsRecommended.tests]);

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
        if(!subject && subjects?.length > 0){
            navigate(`/tests/recommended/${subjects[0].id}`, {replace: true});
        }
    }, [subject, subjects]);

    React.useEffect(() => {
        if(subject){
            loadTestsOfficialBySubjectId(subject, 0, 6, true);
        }
    }, [subject]);

    return (
        <div className={base.baseWrapperGap16}>
            {subjectsIsLoading
            ? <ScrollSkeleton />
            : subjects?.length > 0 && <ScrollWithArrows>
                {subjects?.map(data => <Link key={data.id} to={`/tests/recommended/${data.id}`} replace className={`${base.tag}${subject == data.id ? ` ${base.active}` : ""}`}>{data.subject}</Link>)}
            </ScrollWithArrows>}

            <div className={base.titleInner}>
                <p className={typography.h3}>Варианты {!testsRecommendedIsLoading && `(${testsRecommended.totalCount || 0})`}</p>

                <ReloadButton onClick={() => loadTestsOfficialBySubjectId(subject, 0, 6, true)} loading={testsRecommendedIsLoading} />
            </div>
            
            <BlockDataWithPaggination
                    error={error}
                    dataIsLoading={testsRecommendedIsLoading}
                    dataMoreIsLoading={testsMoreIsLoading}
                    dataLength={testsRecommended?.tests?.length}
                    Skeleton={TestSkeleton}
                    skeletonLoading={6}
                    skeletonMoreLoading={3}
                    containerClassName={base.contentItems}
                    errorContent={<NotContent text="Ошибка при загрузке тестов" icon={<Cross />} danger />}
                    notContent={<NotContent text={"Тестов не найдено"} />}
                    isLast={testsRecommended?.isLast}
                    loadMoreData={loadMoreTests}
                >
                    <div className={base.contentItems}>
                        {testsRecommended?.tests?.map(data => 
                            <TestItem
                                key={data.id}
                                data={data}
                            />)}
                    </div>
                </BlockDataWithPaggination>
        </div>
    )
}

export default Recommended;