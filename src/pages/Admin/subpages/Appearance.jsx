import React from 'react';
import { useSelector } from 'react-redux';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import useTheme from '../../../hooks/useTheme';

import ReloadButton from '../../../components/ReloadButton';
import Button from '../../../components/Button';
import ThemeItemAdmin from '../../../components/ThemeItem/ThemeItemAdmin';
import ThemeItemAdminSkeleton from '../../../components/Skeleton/Theme/ThemeItemAdminSkeleton';

const Appearance = () => {
    // isLoading при удалении включать лоадер на определенную тему
    const {initThemesIsLoading, isLoading, getAllTheme} = useTheme();
    const {themes} = useSelector(state => state.theme);

    React.useEffect(() => {
        getAllTheme();
    }, []);

    return (
        <div className={styles.appearance}>
            <div className={styles.appearanceWrapper}>
                <div className={styles.appearanceTitleInner}>
                    <p className={typography.h3}>Темы (3)</p>

                    <ReloadButton loading={initThemesIsLoading} onClick={() => getAllTheme(true)} />
                </div>

                <Button type="light" auto to="theme/add">
                    Добавить
                </Button>
            </div>

            <div className={styles.appearanceContent}>
                {initThemesIsLoading
                ? [...Array(4)].map((_, id) => <ThemeItemAdminSkeleton key={id} />)
                : themes.map((data, id) => <ThemeItemAdmin key={id} data={data} />)}
            </div>
        </div>
    )
}

export default Appearance;