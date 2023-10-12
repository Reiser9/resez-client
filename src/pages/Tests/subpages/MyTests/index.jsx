import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Cross } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import TestItem from '../../../../components/TestItem';
import Button from '../../../../components/Button';
import NotContent from '../../../../components/NotContent';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import TestSkeleton from '../../../../components/Skeleton/TestItem';
import ReloadButton from '../../../../components/ReloadButton';

const MyTests = () => {
    const [testsMoreLoading, setTestsMoreLoading] = React.useState(false);

    const {testsIsLoading, tests} = useSelector(state => state.test);
    const {error, subjectIsLoading, loadTests, getTests, removeTest} = useTest();

    const loadMoreTests = React.useCallback(async () => {
        setTestsMoreLoading(true);
        await getTests(tests?.tests?.length, 6);
        setTestsMoreLoading(false);
    }, [tests.tests]);

    React.useEffect(() => {
        loadTests(0, 6);
    }, []);

    React.useEffect(() => {
        if(tests?.tests?.length === 0 && !tests?.isLast){
            loadMoreTests();
        }
    }, [tests?.tests, tests?.isLast]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Мои тесты {!testsIsLoading && `(${tests.totalCount || 0})`}</p>

                    <ReloadButton onClick={() => loadTests(0, 6, true)} loading={testsIsLoading} />
                </div>

                {!testsIsLoading && <Button auto type="light" to="../create">
                    Создать
                </Button>}
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={testsIsLoading}
                dataMoreIsLoading={testsMoreLoading}
                dataLength={tests?.tests?.length}
                Skeleton={TestSkeleton}
                skeletonLoading={6}
                skeletonMoreLoading={3}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке тестов" icon={<Cross />} danger />}
                notContent={<NotContent text={"Тестов не найдено"} />}
                isLast={tests?.isLast}
                loadMoreData={loadMoreTests}
            >
                <div className={base.contentItems}>
                    {tests?.tests
                    ?.map(data => <TestItem
                        key={data.id}
                        data={data}
                        loading={subjectIsLoading.includes(data.id)}
                        deleteCallback={() => removeTest(data.id)}
                    />)}
                </div>
            </BlockDataWithPaggination>
        </div>
    )
}

export default MyTests;