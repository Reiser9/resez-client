import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import {Cross} from '../../../../components/Icons';

import useTest from '../../../../hooks/useTest';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import SubjectItem from '../../../../components/SubjectItem';
import SubjectItemSkeleton from '../../../../components/Skeleton/SubjectItem';
import NotContent from '../../../../components/NotContent';

const Subjects = () => {
    const {subjectIsLoading, error, loadSubjects, removeSubject} = useTest();
    const {subjectsIsLoading, subjects} = useSelector(state => state.admin);

    React.useEffect(() => {
        loadSubjects();
    }, []);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Предметы {!subjectsIsLoading && `(${subjects.totalCount || 0})`}</p>

                    <ReloadButton loading={subjectsIsLoading} onClick={() => loadSubjects(true)} />
                </div>

                <Button type="light" auto to="subject/create" disabled={subjectsIsLoading}>
                    Создать
                </Button>
            </div>

            {subjectsIsLoading
            ? <div className={base.contentItems}>
                {[...Array(3)].map((_, id) => <SubjectItemSkeleton key={id} />)}
            </div>
            : error ? <NotContent text="Ошибка при загрузке предметов" icon={<Cross />} danger />
            : subjects.subjects?.length > 0 ? <div className={base.contentItems}>
                {subjects.subjects?.map(data =>
                    <SubjectItem
                        key={data.id}
                        data={data}
                        deleteSubject={() => removeSubject(data.id)}
                        loading={subjectIsLoading.includes(data.id)}
                    />
                )}
            </div>
            : <NotContent text="Предметов не найдено" />}
        </div>
    )
}

export default Subjects;