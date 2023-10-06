import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowLeft, ArrowRight, Cross, Stack, TypesTest } from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import Button from '../../../../components/Button';
import TestItem from '../../../../components/TestItem';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import TestSkeleton from '../../../../components/Skeleton/TestItem';
import NotContent from '../../../../components/NotContent';
import ReloadButton from '../../../../components/ReloadButton';

const TestMain = () => {
    const [scroll, setScroll] = React.useState(0);
    const [scrollBlock, setScrollBlock] = React.useState(0);
    const scrollContainerRef = React.useRef(null);

    const [testsThree, setTestsThree] = React.useState([]);

    const {isAuth} = useSelector(state => state.auth);
    const {testsIsLoading, tests} = useSelector(state => state.test);
    const {error, loadTests, getTests} = useTest();
  
    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        setScroll(scrollLeft);
    }

    const scrollTo = (scroll) => {
        scrollContainerRef.current.scrollBy({
            left: scroll,
            behavior: 'smooth',
        });
    }

    const updateMaxScroll = () => {
        const block = scrollContainerRef.current;
    
        if(block){
            const maxScrollAmount = block.scrollWidth - block.clientWidth;
            setScrollBlock(maxScrollAmount);
        }
    }

    React.useEffect(() => {
        updateMaxScroll();
    
        const block = scrollContainerRef.current;

        const observer = new MutationObserver(updateMaxScroll);

        if (block) {
            observer.observe(block, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
        };
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
            <div className={styles.subjectsTags}>
                {/* Компонент */}
                <div className={`${styles.subjectsTagsContent} ${scroll >= 40 ? ` ${styles.arrowFade}` : ""}`} ref={scrollContainerRef} onScroll={handleScroll}>
                    <Link to="russian" className={styles.subjectsTag}>Русский язык</Link>
                    <Link to="russian" className={styles.subjectsTag}>Математика</Link>
                    <Link to="russian" className={styles.subjectsTag}>Физика</Link>
                    <Link to="russian" className={styles.subjectsTag}>Литература</Link>
                    <Link to="russian" className={styles.subjectsTag}>Информатика</Link>
                    <Link to="russian" className={styles.subjectsTag}>Обществознание</Link>
                    <Link to="russian" className={styles.subjectsTag}>Химия</Link>
                    <Link to="russian" className={styles.subjectsTag}>Биология</Link>
                    <Link to="russian" className={styles.subjectsTag}>Английский язык</Link>
                    <Link to="russian" className={styles.subjectsTag}>История</Link>
                    <Link to="russian" className={styles.subjectsTag}>География</Link>
                </div>

                {scrollBlock > 0 && <>
                    <div className={`${styles.subjectsTagsArrowInner} ${styles.prev}${scroll > 0 ? ` ${styles.arrowFade}` : ""}`}>
                        <div className={styles.subjectsTagsArrow} onClick={() => scrollTo(-200)}>
                            <ArrowLeft />
                        </div>
                    </div>

                    <div className={`${styles.subjectsTagsArrowInner} ${styles.next}${scroll < scrollBlock ? ` ${styles.arrowFade}` : ""}`}>
                        <div className={styles.subjectsTagsArrow} onClick={() => scrollTo(200)}>
                            <ArrowRight />
                        </div>
                    </div>
                </>}
            </div>

            <div className={styles.testWelcomeWrapper}>
                <div className={styles.testWelcome}>
                    <div className={styles.testWelcomeIconInner}>
                        <Stack />
                    </div>

                    <div className={styles.testWelcomeTextInner}>
                        <p className={typography.h4}>Создайте свой вариант из заданных заданий</p>

                        <p className={typography.text2}>
                            Пройдите или создайте свой уникальный тест, выбирая задания из предложенных вариантов. Узнайте свой уровень знаний, составляя набор заданий, который соответствует вашим интересам и целям. Начните свой путь к успеху уже сегодня!
                        </p>
                        
                        {isAuth
                        ? <Button to="create" auto type="light" small className={styles.testWelcomeButton}>
                            Создать вариант
                        </Button>
                        : <Button to="/login" auto type="light" small className={styles.testWelcomeButton}>
                            Авторизуйтесь
                        </Button>}
                    </div>

                    <TypesTest className={styles.testWelcomeIcon} />
                </div>
            </div>

            <div className={`${base.baseWrapperGap16} ${styles.testBlock}`}>
                <p className={typography.h3}>Рекомендованные тесты</p>

                <div className={base.contentItems}>
                    <TestItem data={{subject: "Английский язык"}} />
                </div>
            </div>

            <div className={`${base.baseWrapperGap16} ${styles.testBlock}`}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <p className={typography.h3}>Мои тесты ({testsThree?.length})</p>

                        <ReloadButton loading={testsIsLoading} onClick={() => loadTests(0, 6, true)} />
                    </div>

                    {!testsIsLoading && <Button auto type="light" to="my">
                        Смотреть все
                    </Button>}
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
                            //loading={testIsLoading.includes(data.id)}
                        />)}
                    </div>
                </BlockDataWithPaggination>
            </div>
        </div>
    )
}

export default TestMain;