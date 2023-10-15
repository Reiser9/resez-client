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

const TestView = () => {
    const [actionMenu, setActionMenu] = React.useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    const {copyTextWithNotify} = useUtils();
    const {isLoading, getTestById} = useTest();
    const {test} = useSelector(state => state.test);

    React.useEffect(() => {
        if(id){
            getTestById(id, () => navigate("/tests", {replace: true}));
        }
    }, [id]);

    const {isOfficial, isPrivate, isExam, date, subject, tasksCount, user, tasks} = test || {};
    const {nickname, avatar} = user || {};

    if(isLoading){
        return <Preloader page />
    }

    return (
        <div className={base.baseWrapperGap40}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInnerNowrap}>
                    <div className={styles.testTags}>
                        <BackButton />

                        <div className={styles.testTag}>
                            {subject}
                        </div>

                        <div className={styles.testTag}>
                            Вопросов: {tasksCount}
                        </div>

                        {isPrivate && <Tooltip title="Скрыта">
                            <div className={styles.testTagIcon}>
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

                            <MenuLink>
                                <Edit />

                                Редактировать
                            </MenuLink>

                            <MenuLink danger>
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
                            {avatar
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
    )
}

export default TestView;