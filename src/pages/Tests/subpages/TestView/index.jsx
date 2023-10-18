import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useUtils from '../../../../hooks/useUtils';
import useTest from '../../../../hooks/useTest';

import { Date, Delete, DotsHorizontal, Edit, Lock, Settings, TypesVariantStart } from '../../../../components/Icons';

import { formatDate } from '../../../../utils/formatDate';

import BackButton from '../../../../components/BackButton';
import HoverMenu from '../../../../components/HoverMenu';
import MenuLink from '../../../../components/HoverMenu/MenuLink';
import IconButton from '../../../../components/IconButton';
import CardLink from '../../../../components/CardLink';
import TestQuestionItem from '../../../../components/TestQuestionItem';
import Preloader from '../../../../components/Preloader';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';

const TestView = () => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    const {copyTextWithNotify} = useUtils();
    const {isLoading, getTestById, removeTest} = useTest();
    const {test} = useSelector(state => state.test);
    const {user: userData} = useSelector(state => state.user);
    const {settings, id: userId} = userData || {};
    const {isShowAvatars} = settings || {};

    React.useEffect(() => {
        if(id){
            getTestById(id, () => navigate("/tests", {replace: true}));
        }
    }, [id]);

    const {id: testId, isOfficial, isPrivate, isExam, date, subject, tasksCount, user, tasks} = test || {};
    const {id: authorId, nickname, avatar} = user || {};

    if(isLoading){
        return <Preloader page />
    }

    return (
        <>
            <div className={base.baseWrapperGap40}>
                <div className={base.baseWrapperGap16}>
                    <div className={base.titleInnerNowrap}>
                        <div className={styles.testTags}>
                            <BackButton />

                            <div className={base.tagElement}>
                                {subject}
                            </div>

                            <div className={base.tagElement}>
                                Вопросов: {tasksCount}
                            </div>

                            {isPrivate && <Tooltip title="Скрыта">
                                <div className={base.tagElementIcon}>
                                    <Lock />
                                </div>
                            </Tooltip>}
                        </div>

                        <div className={styles.testTags}>
                            <HoverMenu
                                value={actionMenu}
                                setValue={setActionMenu}
                                button={
                                    <IconButton type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                        <DotsHorizontal />
                                    </IconButton>
                                }
                            >
                                <MenuLink disabled>
                                    <Settings />

                                    Настройки
                                </MenuLink>

                                <MenuLink disabled>
                                    <Edit />

                                    Редактировать
                                </MenuLink>

                                <MenuLink danger onClick={() => setConfirmDelete(true)}>
                                    <Delete />

                                    Удалить
                                </MenuLink>
                            </HoverMenu>
                        </div>
                    </div>

                    <p className={`${typography.h4} ${styles.testId}`} onClick={() => copyTextWithNotify(id, "ID теста скопировано")}>
                        ID: {id}
                    </p>

                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <div className={base.circle40}>
                                {avatar && !isShowAvatars || userId === authorId
                                ? <img src={avatar} alt="avatar" className={base.circleAvatar} />
                                : nickname ? nickname[0] : "No"}
                            </div>

                            <p className={typography.text}>{nickname}</p>
                        </div>

                        <div className={styles.testDateInner}>
                            <Date />

                            {formatDate(date, "D MMMM YYYY")}
                        </div>
                    </div>
                </div>

                <div className={base.contentItems}>
                    <CardLink title="Решать" to="test">
                        <TypesVariantStart />
                    </CardLink>
                </div>

                <div className={base.baseWrapperGap12}>
                    <p className={typography.h4}>Вопросы ({tasksCount})</p>

                    <div className={base.contentItems}>
                        {tasks?.map(data => <TestQuestionItem
                            key={data.id}
                            data={data}
                        />)}
                    </div>
                </div>
            </div>

            <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text="Вы действительно хотите удалить тест?"
                callback={() => removeTest(testId, () => navigate("/tests", {replace: true}))}
            />
        </>
    )
}

export default TestView;