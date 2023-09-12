import React from 'react';
import {useSelector} from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useTraining from '../../../../hooks/useTraining';

import { Cross } from '../../../../components/Icons';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import NotContent from '../../../../components/NotContent';
import CollectionItem from '../../../../components/CollectionItem';

const Cards = () => {
    const {error, isLoading, loadCollections} = useTraining();
    const {collections} = useSelector(state => state.training);

    React.useEffect(() => {
        loadCollections(0, 6);
    }, []);

    return (
        <div className={styles.cards}>
            <div className={styles.cardsWrapper}>
                <div className={styles.cardsTitleInner}>
                    <p className={typography.h3}>Коллекции (3)</p>

                    <ReloadButton />
                </div>

                <Button type="light" auto to="add">
                    Добавить
                </Button>
            </div>

            {isLoading
            ? <div className={styles.collectionsContent}>
                Загрузка...
            </div>
            : error ? <NotContent text="Ошибка при загрузке коллекций" icon={<Cross />} danger />
            : collections?.collections?.length > 0 ? <div className={styles.collectionsContent}>
                {collections?.collections?.map((data, id) => <CollectionItem key={id} data={data} />)}
            </div>
            : <NotContent text="Коллекций не найдено" />}
        </div>
    )
}

export default Cards;