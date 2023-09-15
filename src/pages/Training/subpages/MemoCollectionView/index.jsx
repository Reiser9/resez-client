import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowRightLong, Date, Delete, DotsHorizontal, Edit, Lock, TypesCards, TypesLearn, TypesSelection, TypesTest } from '../../../../components/Icons';

import {formatDate} from '../../../../utils/formatDate';

import useTraining from '../../../../hooks/useTraining';

import BackButton from '../../../../components/BackButton';
import HoverMenu from '../../../../components/HoverMenu';
import MenuLink from '../../../../components/HoverMenu/MenuLink';
import IconButton from '../../../../components/IconButton';
import TextPoint from '../../../../components/TextPoint';
import Preloader from '../../../../components/Preloader';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';

const CardCollectionView = () => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);

    const {isLoading, getCollectionById, deleteCollection} = useTraining();
    const navigate = useNavigate();
    const {id} = useParams();
    const {collection} = useSelector(state => state.training);

    React.useEffect(() => {
        if(isNaN(id)){
            return navigate("../memo");
        }

        getCollectionById(id, () => navigate("../memo"));
    }, [id]);

    const {collection: name, pairsCount, description, isPrivate, user, QAPairs, date} = collection;

    if(isLoading){
        return <Preloader page />
    }

    return (
        <div className={styles.memoCollection}>
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
                            <IconButton onClick={() => setActionMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                    >
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

            <div className={styles.memoCollectionWrapper}>
                <div className={styles.memoCollectionAuthor}>
                    <div className={styles.memoCollectionAuthorImgInner}>
                        {user?.avatar
                            ? <img src={user?.avatar} alt="avatar" className={styles.memoCollectionAuthorImg} />
                            : <p className={styles.memoCollectionAuthorLetter}>{user?.nickname[0]}</p>}
                    </div>

                    <p className={typography.text}>{user?.nickname}</p>
                </div>

                {date && <div className={styles.memoCollectionDateInner}>
                    <Date />

                    {formatDate(date, "D MMMM YYYY")}
                </div>}
            </div>

            <div className={styles.memoCollectionTypes}>
                <Link to="cards" className={styles.memoCollectionTypesItem}>
                    <span className={styles.memoCollectionTypesItemWrapper}>
                        <p className={styles.memoCollectionTypeName}>Карточки</p>

                        <ArrowRightLong />
                    </span>

                    <span className={styles.memoCollectionTypeImgInner}>
                        <TypesCards />
                    </span>
                </Link>

                <Link to="test" className={`${styles.memoCollectionTypesItem} ${styles.disabled}`}>
                    <span className={styles.memoCollectionTypesItemWrapper}>
                        <p className={styles.memoCollectionTypeName}>Тест</p>

                        <ArrowRightLong />
                    </span>

                    <span className={styles.memoCollectionTypeImgInner}>
                        <TypesTest />
                    </span>
                </Link>

                <Link to="learn" className={`${styles.memoCollectionTypesItem} ${styles.disabled}`}>
                    <span className={styles.memoCollectionTypesItemWrapper}>
                        <p className={styles.memoCollectionTypeName}>Заучивание</p>

                        <ArrowRightLong />
                    </span>

                    <span className={styles.memoCollectionTypeImgInner}>
                        <TypesLearn />
                    </span>
                </Link>

                <Link to="selection" className={`${styles.memoCollectionTypesItem} ${styles.disabled}`}>
                    <span className={styles.memoCollectionTypesItemWrapper}>
                        <p className={styles.memoCollectionTypeName}>Подбор</p>

                        <ArrowRightLong />
                    </span>

                    <span className={styles.memoCollectionTypeImgInner}>
                        <TypesSelection />
                    </span>
                </Link>
            </div>

            <div className={styles.memoCollectionPairsInner}>
                <p className={typography.h4}>Термины ({pairsCount || 0})</p>

                <div className={styles.memoCollectionPairs}>
                    {QAPairs?.map(data => <div key={data.id} className={styles.memoCollectionPair}>
                        <TextPoint title="Вопрос" text={data.question} />
                        <TextPoint title="Ответ" text={data.answer} />
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