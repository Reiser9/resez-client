import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useUtils from '../../../../hooks/useUtils';
import useTest from '../../../../hooks/useTest';

import { Date, Delete, DotsHorizontal, Lock, Settings, TypesVariantStart } from '../../../../components/Icons';

import {PERMISSIONS} from '../../../../consts/PERMISSIONS';
import { formatDate } from '../../../../utils/formatDate';
import { checkPermission } from '../../../../utils/checkPermission';

import BackButton from '../../../../components/BackButton';
import HoverMenu from '../../../../components/HoverMenu';
import MenuLink from '../../../../components/HoverMenu/MenuLink';
import IconButton from '../../../../components/IconButton';
import CardLink from '../../../../components/CardLink';
import TestQuestionItem from '../../../../components/TestQuestionItem';
import Preloader from '../../../../components/Preloader';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import NotContent from '../../../../components/NotContent';
import Button from '../../../../components/Button';

const TestView = () => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    const {copyTextWithNotify} = useUtils();
    const {isLoading, getTestById, removeTest} = useTest();
    const {test} = useSelector(state => state.test);
    const {user: userData} = useSelector(state => state.user);
    const {isAuth} = useSelector(state => state.auth);
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

                            {isOfficial && <Tooltip title="Тест разработан командой ResEz">
                                <div className={base.tagElement}>
                                    ResEz
                                </div>
                            </Tooltip>}

                            {isExam && <Tooltip title="Вариант ЕГЭ">
                                <div className={base.tagElement}>
                                    ЕГЭ
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

                                {(checkPermission(userData?.permissions, PERMISSIONS.DELETE_TESTS) || userId === authorId)
                                && <MenuLink danger onClick={() => {
                                    setConfirmDelete(true);
                                    setActionMenu(false);
                                }}>
                                    <Delete />

                                    Удалить
                                </MenuLink>}
                            </HoverMenu>
                        </div>
                    </div>

                    <p className={`${typography.h4} ${styles.testId}`} onClick={() => copyTextWithNotify(id, "ID теста скопировано")}>
                        ID: {id}
                    </p>

                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <div className={base.circle40}>
                                {avatar && (!isShowAvatars || userId === authorId)
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

                <div className={base.baseWrapperGap12}>
                    {!isAuth && <div className={base.titleInner}>
                        <p className={`${typography.text} ${base.warningText}`}>Авторизуйтесь, чтобы сохранить результат прорешивания варианта</p>

                        <Button type="light" small auto to="/login">
                            Авторизация
                        </Button>
                    </div>}

                    <div className={base.contentItems}>
                        <CardLink title="Решать" to="test" disabled={tasks?.length <= 0}>
                            <TypesVariantStart />
                        </CardLink>
                    </div>
                </div>

                <div className={base.baseWrapperGap12}>
                    <p className={typography.h4}>Задания ({tasksCount})</p>

                    {tasks?.length > 0
                    ? <div className={base.contentItems}>
                        {tasks?.map(data => <TestQuestionItem
                            key={data.id}
                            data={data}
                        />)}
                    </div>
                    : <NotContent text="Заданий не найдено" />}
                </div>
            </div>

            {(checkPermission(userData?.permissions, PERMISSIONS.DELETE_TESTS) || userId === authorId) && <ConfirmModal
                value={confirmDelete}
                setValue={setConfirmDelete}
                text="Вы действительно хотите удалить тест?"
                callback={() => removeTest(testId, () => navigate("/tests", {replace: true}))}
            />}
        </>
    )
}

export default TestView;