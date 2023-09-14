import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowRightLong, Delete, DotsHorizontal, Edit, Lock } from '../Icons';

import IconButton from '../IconButton';
import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';
import ConfirmModal from '../Modal/ConfirmModal';

const CollectionItem = ({data, deleteCollection = () => {}}) => {
    const [collectionItemMenu, setCollectionItemMenu] = React.useState(false);

    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);

    const {collection, description, pairsCount, user, id, isPrivate} = data;
    const {nickname, avatar} = user;

    return (
        <>
            <div className={styles.collectionItem}>
                <div className={styles.collectionItemInfoInner}>
                    <div className={styles.collectionItemInfo}>
                        <p className={styles.collectionItemName}>{collection}</p>

                        <div className={styles.collectionItemTags}>
                            <p className={styles.collectionItemNumber}>Терминов: {pairsCount}</p>

                            {isPrivate && <Tooltip title="Скрыта">
                                <div className={styles.collectionItemLock}>
                                    <Lock />
                                </div>    
                            </Tooltip>}
                        </div>
                    </div>

                    <Link to={`${id}`} className={styles.collectionItemLink}>
                        <ArrowRightLong />
                    </Link>
                </div>

                {description && <p className={`${typography.text2} ${styles.collectionItemDescription}`}>{description}</p>}

                <div className={styles.collectionItemBottom}>
                    <div className={styles.collectionItemAuthor}>
                        <div className={styles.collectionItemAuthorImgInner}>
                            {avatar
                                ? <img src={avatar} alt="avatar" className={styles.collectionItemAuthorImg} />
                                : <p className={styles.collectionItemAuthorWord}>{nickname[0].toUpperCase()}</p>}
                        </div>

                        <p className={styles.collectionItemAuthorName}>{nickname}</p>
                    </div>

                    <HoverMenu
                        button={
                            <IconButton type="light" small onClick={() => setCollectionItemMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={collectionItemMenu}
                        setValue={setCollectionItemMenu}
                    >
                        <MenuLink>
                            <Edit />

                            Редактировать
                        </MenuLink>

                        <MenuLink danger onClick={() => {
                            setDeleteCollectionModal(true);
                            setCollectionItemMenu(false);
                        }}>
                            <Delete />

                            Удалить
                        </MenuLink>
                    </HoverMenu>
                </div>
            </div>

            <ConfirmModal
                value={deleteCollectionModal}
                setValue={setDeleteCollectionModal}
                text="Вы действительно хотите удалить коллекцию?"
                callback={deleteCollection}
            />
        </>
    )
}

export default CollectionItem;