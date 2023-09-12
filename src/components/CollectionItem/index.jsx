import React from 'react';
import { Link } from 'react-router-dom';

import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { ArrowRightLong, DotsHorizontal } from '../Icons';

import IconButton from '../IconButton';

const CollectionItem = ({data}) => {
    const {collection, description, pairsCount, user, id, isPrivate} = data;
    const {nickname, avatar} = user;

    return (
        <div className={styles.collectionItem}>
            <div className={styles.collectionItemInfoInner}>
                <div className={styles.collectionItemInfo}>
                    <p className={styles.collectionItemName}>{collection}</p>

                    <p className={styles.collectionItemNumber}>Терминов: {pairsCount}</p>
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

                <IconButton type="light" small>
                    <DotsHorizontal />
                </IconButton>
            </div>
        </div>
    )
}

export default CollectionItem;