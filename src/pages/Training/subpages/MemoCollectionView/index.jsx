import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Date, Delete, DotsHorizontal, Edit, Lock, Settings, TypesCards, TypesLearn, TypesSelection, TypesTest } from '../../../../components/Icons';

import {formatDate} from '../../../../utils/formatDate';

import useTraining from '../../../../hooks/useTraining';

import BackButton from '../../../../components/BackButton';
import HoverMenu from '../../../../components/HoverMenu';
import MenuLink from '../../../../components/HoverMenu/MenuLink';
import IconButton from '../../../../components/IconButton';
import TextPoint from '../../../../components/TextPoint';
import Preloader from '../../../../components/Preloader';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import CardLink from '../../../../components/CardLink';

const CardCollectionView = () => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);
    const [showAnswers, setShowAnswers] = React.useState(false);

    const {isLoading, getCollectionById, deleteCollection} = useTraining();
    const navigate = useNavigate();
    const {id} = useParams();
    const {collection} = useSelector(state => state.training);
    const {user: userData} = useSelector(state => state.user);
    const {settings, id: userId} = userData || {};
    const {isShowAvatars} = settings || {};

    React.useEffect(() => {
        if(isNaN(id)){
            return navigate("../memo");
        }

        getCollectionById(id, () => navigate("../memo"));
    }, [id]);

    const {collection: name, pairsCount, description, isPrivate, user, QAPairs, date} = collection || {};
    const {id: authorId, nickname, avatar} = user || {};

    if(isLoading){
        return <Preloader page />
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={styles.memoCollectionTitleInner}>
                <BackButton />

                <div className={styles.memoCollectionTags}>
                    <div className={styles.memoCollectionCount}>
                        Терминов: {pairsCount || 0}
                    </div>

                    {isPrivate && <Tooltip title="Скрыта">
                        <div className={styles.memoCollectionLock}>
                            <Lock />
                        </div>    
                    </Tooltip>}
                </div>

                <div className={styles.memoCollectionActions}>
                    <HoverMenu
                        value={actionMenu}
                        setValue={setActionMenu}
                        button={
                            <IconButton type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                    >
                        <MenuLink onClick={() => navigate("settings")} disabled>
                            <Settings />

                            Настройки
                        </MenuLink>

                        <MenuLink onClick={() => navigate("edit")}>
                            <Edit />

                            Редактировать
                        </MenuLink>

                        <MenuLink danger onClick={() => setDeleteCollectionModal(true)}>
                            <Delete />

                            Удалить
                        </MenuLink>
                    </HoverMenu>
                </div>
            </div>

            <div className={styles.memoCollectionTextInner}>
                {name && <p className={typography.h4}>{name}</p>}

                {description && <p className={typography.text}>
                    {description}
                </p>}
            </div>

            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <div className={base.circle40}>
                        {avatar && !isShowAvatars || userId === authorId
                            ? <img src={avatar} alt="avatar" className={base.circleAvatar} />
                            : nickname && nickname[0]}
                    </div>

                    <p className={typography.text}>{nickname}</p>
                </div>

                {date && <div className={styles.memoCollectionDateInner}>
                    <Date />

                    {formatDate(date, "D MMMM YYYY")}
                </div>}
            </div>

            <div className={`${base.contentItems} ${styles.memoCollectionTypes}`}>
                <CardLink title="Карточки" to="cards">
                    <TypesCards />
                </CardLink>

                <CardLink title="Тест" to="test" disabled>
                    <TypesTest />
                </CardLink>

                <CardLink title="Заучивание" to="learn" disabled>
                    <TypesLearn />
                </CardLink>

                <CardLink title="Подбор" to="selection" disabled>
                    <TypesSelection />
                </CardLink>
            </div>

            <div className={`${base.contentItems} ${styles.memoCollectionPairsInner}`}>
                <div className={base.titleInner}>
                    <p className={typography.h4}>Термины ({pairsCount || 0})</p>

                    <button className={styles.memoCollectionsShowAnswers} onClick={() => setShowAnswers(prev => !prev)}>
                        {showAnswers ? "Скрыть ответы" : "Показать ответы"}
                    </button>
                </div>

                <div className={base.contentItems}>
                    {QAPairs?.map(data => <div key={data.id} className={`${base.item3} ${styles.memoCollectionPair}`}>
                        <TextPoint title="Вопрос" text={data.question} />
                        <TextPoint blur={!showAnswers} title="Ответ" text={data.answer} />
                    </div>)}
                </div>
            </div>

            <ConfirmModal
                value={deleteCollectionModal}
                setValue={setDeleteCollectionModal}
                text="Вы действительно хотите удалить коллекцию?"
                callback={() => deleteCollection(id, () => navigate("../memo"))}
            />
        </div>
    )
}

export default CardCollectionView;