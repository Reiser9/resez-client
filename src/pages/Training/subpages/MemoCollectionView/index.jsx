import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './index.module.css';

import useTraining from '../../../../hooks/useTraining';

const CardCollectionView = () => {
    const {getCollectionById} = useTraining();
    const {id} = useParams();

    React.useEffect(() => {
        getCollectionById(id);
    }, [id]);

    return (
        <div className={styles.memoCollection}>
            Карточка с ID: {id}

            <Link to="cards" className={styles.memoCollectionPlay}>
                Играть
            </Link>
        </div>
    )
}

export default CardCollectionView;