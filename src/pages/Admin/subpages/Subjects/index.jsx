import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';

import {Cross} from '../../../../components/Icons';
import { PERMISSIONS } from '../../../../consts/PERMISSIONS';

import { checkPermission } from '../../../../utils/checkPermission';

import useTest from '../../../../hooks/useTest';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import SubjectItem from '../../../../components/SubjectItem';
import SubjectItemSkeleton from '../../../../components/Skeleton/SubjectItem';
import NotContent from '../../../../components/NotContent';

const Subjects = () => {
    const [subjectsElements, setSubjectsElements] = React.useState([]);
    const [isManySubjects, setIsManySubjects] = React.useState(false);

    const {subjectIsLoading, error, loadSubjects, removeSubject} = useTest();
    const {subjectsIsLoading, subjects} = useSelector(state => state.admin);
    const {user} = useSelector(state => state.user);

    const showAllSubjects = () => {
        setSubjectsElements(subjects?.subjects);
        setIsManySubjects(false);
    }

    const hideSubjects = () => {
        const subjectsHide = subjects?.subjects?.slice(0, 3);
        setSubjectsElements(subjectsHide);

        if(subjects?.subjects?.length > 3){
            setIsManySubjects(true);
        }
    }

    React.useEffect(() => {
        loadSubjects();
    }, []);

    React.useEffect(() => {
        hideSubjects();
    }, [subjects]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Предметы {!subjectsIsLoading && `(${subjects.totalCount || 0})`}</p>

                    <ReloadButton loading={subjectsIsLoading} onClick={() => loadSubjects(true)} />
                </div>

                {checkPermission(user?.permissions, [PERMISSIONS.CREATE_SUBJECTS]) && <Button type="light" small auto to="subject/create" disabled={subjectsIsLoading}>
                    Создать
                </Button>}
            </div>

            {subjectsIsLoading
            ? <div className={base.contentItems}>
                {[...Array(3)].map((_, id) => <SubjectItemSkeleton key={id} />)}
            </div>
            : error ? <NotContent text="Ошибка при загрузке предметов" icon={<Cross />} danger />
            : subjectsElements?.length > 0 ? <div className={`${base.baseWrapperGap16} ${base.aic}`}>
                <div className={base.contentItems}>
                    {subjectsElements?.map(data =>
                        <SubjectItem
                            key={data.id}
                            data={data}
                            deleteSubject={() => removeSubject(data.id)}
                            loading={subjectIsLoading.includes(data.id)}
                            edit={checkPermission(user?.permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
                            remove={checkPermission(user?.permissions, [PERMISSIONS.DELETE_SUBJECTS])}
                        />
                    )}
                </div>

                {subjects?.subjects?.length > 3 && (isManySubjects
                ? <Button type="light" auto onClick={showAllSubjects}>
                    Показать все
                </Button>
                : <Button type="light" auto onClick={hideSubjects}>
                    Скрыть
                </Button>)}
            </div>
            : <NotContent text="Предметов не найдено" />}
        </div>
    )
}

export default Subjects;