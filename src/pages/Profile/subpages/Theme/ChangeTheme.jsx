import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.css';

import useTheme from '../../../../hooks/useTheme';

import ThemeItem from '../../../../components/ThemeItem';
import ThemeItemSkeleton from '../../../../components/Skeleton/Theme/ThemeItemSkeleton';
import NotContent from '../../../../components/NotContent';

const ChangeTheme = () => {
    const {initThemesIsLoading, isLoading, getAllTheme, editTheme} = useTheme();
    const {themes} = useSelector(state => state.theme);
    const {user} = useSelector(state => state.user);

    React.useEffect(() => {
        getAllTheme();
    }, []);

    return (
        <div className={styles.colorsContent}>
            {initThemesIsLoading
            ? [...Array(4)].map((_, id) => <ThemeItemSkeleton key={id} />)
            : themes?.themes?.length > 0 ? themes.themes.map(data => <ThemeItem
                key={data.id}
                data={data}
                onClick={() => editTheme(data.id)}
                active={user?.theme?.id === data.id}
                disabled={isLoading}
            />) : <NotContent text="Тем не найдено" />}
        </div>
    )
}

export default ChangeTheme;