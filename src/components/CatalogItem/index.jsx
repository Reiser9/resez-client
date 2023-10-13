import React from 'react';
import { Link } from 'react-router-dom';

import base from '../../styles/base.module.css';
import styles from './index.module.css';

const CatalogItem = ({
    data,
    ...props
}) => {
    const {number, totalCount, theme, subThemes} = data || {};

    return (
        <div className={`${base.item2} ${styles.catalogItem}`} {...props}>
            <div className={base.titleWrapper}>
                <div className={base.circle25}>
                    {number}
                </div>

                <p className={styles.catalogItemTitle}>{theme} ({totalCount})</p>
            </div>

            <div className={styles.catalogItemSubthemes}>
                {subThemes.map(data => data.tasksCount !== 0
                    ? <Link key={data.id} to={`/subtheme/${data.id}`} className={styles.catalogItemLink}>({data.tasksCount}) {data.subTheme}</Link>
                    : <p key={data.id} className={styles.catalogItemText}>({data.tasksCount}) {data.subTheme}</p>)}
            </div>
        </div>
    )
}

export default CatalogItem;