import React from 'react';

import styles from './index.module.css';

import { Cross } from '../Icons';

import Button from '../Button';
import NotContent from '../NotContent';

const BlockDataWithPaggination = ({
    error = false,
    dataIsLoading = false,
    dataMoreIsLoading = false,
    dataLength = 0,
    Skeleton,
    skeletonLoading = 6,
    skeletonMoreLoading = 3,
    containerClassName = "",
    errorContent,
    notContent,
    isLast = false,
    loadMoreData = () => {},
    moreButtonText = "Показать еще",
    children
}) => {
    return (
        <>
            {dataIsLoading
            ? <div className={containerClassName}>
                {[...Array(skeletonLoading)].map((_, id) => <Skeleton key={id} />)}
            </div>
            : error ? errorContent ? errorContent : <NotContent text="Ошибка при загрузке" icon={<Cross />} danger />
            : dataLength > 0 ? <div className={containerClassName}>
                {children}
            </div>
            : notContent ? notContent : <NotContent text="Данных не найдено" />}

            {dataMoreIsLoading && <div className={containerClassName}>
                {[...Array(skeletonMoreLoading)].map((_, id) => <Skeleton key={id} />)}
            </div>}

            {dataLength > 0 && !dataMoreIsLoading && !isLast && <Button loading={dataMoreIsLoading} type="empty" auto className={styles.dataMoreButton} onClick={loadMoreData}>
                {moreButtonText}
            </Button>}
        </>
    )
}

export default BlockDataWithPaggination;