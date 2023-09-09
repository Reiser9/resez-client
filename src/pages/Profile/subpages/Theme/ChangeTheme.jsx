import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.css';

import useTheme from '../../../../hooks/useTheme';

import ThemeItem from '../../../../components/ThemeItem';
import ThemeItemSkeleton from '../../../../components/Skeleton/Theme/ThemeItemSkeleton';
import NotContent from '../../../../components/NotContent';
import Button from '../../../../components/Button';

const ChangeTheme = () => {
    const {isLoading, loadAllThemes, editTheme} = useTheme();
    const {themesIsLoading, themes} = useSelector(state => state.theme);
    const {user} = useSelector(state => state.user);

    React.useEffect(() => {
        loadAllThemes(0, 8);
    }, []);

    return (
        <div className={styles.colorsContent}>
            {themesIsLoading
            ? [...Array(4)].map((_, id) => <ThemeItemSkeleton key={id} />)
            : themes?.themes?.length > 0 ? themes.themes.map(data => <ThemeItem
                key={data.id}
                data={data}
                onClick={() => editTheme(data.id)}
                active={user?.theme?.id === data.id}
                disabled={isLoading}
            />) : <NotContent text="Вы не добавили ни одной темы">
                <Button to="/store" auto type="light">
                    В магазин
                </Button>
            </NotContent>}
        </div>
    )
}

export default ChangeTheme;