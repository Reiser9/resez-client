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
import CollectionItemSkeleton from '../../../../components/Skeleton/CollectionItem/CollectionItemSkeleton';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';

const Cards = () => {
    const [collectionMoreLoading, setCollectionMoreLoading] = React.useState(false);

    const {error, collectionIsLoading, loadCollections, getCollections, deleteCollection} = useTraining();
    const {collectionsIsLoading, collections} = useSelector(state => state.training);

    const loadMoreCollection = React.useCallback(async () => {
        setCollectionMoreLoading(true);
        await getCollections(collections?.collections?.length, 6);
        setCollectionMoreLoading(false);
    }, [collections.collections]);

    React.useEffect(() => {
        loadCollections(0, 6);
    }, []);

    React.useEffect(() => {
        if(collections?.collections?.length === 0 && !collections?.isLast){
            loadMoreCollection();
        }
    }, [collections?.collections, collections?.isLast]);

    return (
        <div className={styles.cards}>
            <div className={styles.cardsWrapper}>
                <div className={styles.cardsTitleInner}>
                    <p className={typography.h3}>Коллекции {!collectionsIsLoading && `(${collections.totalCount || 0})`}</p>

                    <ReloadButton loading={collectionsIsLoading} onClick={() => loadCollections(0, 6, true)} />
                </div>

                <Button disabled={collectionsIsLoading} type="light" auto to="add">
                    Создать
                </Button>
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={collectionsIsLoading}
                dataMoreIsLoading={collectionMoreLoading}
                dataLength={collections?.collections?.length}
                Skeleton={CollectionItemSkeleton}
                containerClassName={styles.collectionsContent}
                errorContent={<NotContent text="Ошибка при загрузке коллекций" icon={<Cross />} danger />}
                notContent={<NotContent text="Коллекций не найдено" />}
                isLast={collections?.isLast}
                loadMoreData={loadMoreCollection}
            >
                {collections?.collections?.map((data, id) =>
                    <CollectionItem
                        key={id}
                        data={data}
                        deleteCollection={() => deleteCollection(data.id)}
                        loading={collectionIsLoading.includes(data.id)}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Cards;