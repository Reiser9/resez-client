import React from 'react';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from '../AddTheme/index.module.css';

import useAdmin from '../../../../hooks/useAdmin';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import ThemeItemAdmin from '../../../../components/ThemeItem/ThemeItemAdmin';
import ThemeItemAdminSkeleton from '../../../../components/Skeleton/Theme/ThemeItemAdminSkeleton';
import NotContent from '../../../../components/NotContent';

const Appearance = () => {
    const [themesMoreLoading, setThemesMoreLoading] = React.useState(false);
    const {themesIsLoading, themes} = useSelector(state => state.admin);
    const {themeIsLoading, error, loadAllThemes, getAllThemes, removeTheme} = useAdmin();

    const loadMoreThemes = React.useCallback(async () => {
        setThemesMoreLoading(true);
        await getAllThemes(themes?.themes?.length, 8);
        setThemesMoreLoading(false);
    }, [themes.themes]);

    React.useEffect(() => {
        loadAllThemes(0, 8);
    }, []);

    React.useEffect(() => {
        if(themes?.themes?.length === 0 && !themes?.isLast){
            loadMoreThemes();
        }
    }, [themes?.themes, themes?.isLast]);

    return (
        <div className={styles.appearance}>
            <div className={styles.appearanceWrapper}>
                <div className={styles.appearanceTitleInner}>
                    <p className={typography.h3}>Темы {!themesIsLoading && `(${themes.totalCount || 0})`}</p>

                    <ReloadButton loading={themesIsLoading} onClick={() => loadAllThemes(0, 8, true)} />
                </div>

                <Button disabled={themesIsLoading} type="light" auto to="theme/add">
                    Добавить
                </Button>
            </div>

            {themesIsLoading
            ? <div className={styles.appearanceContent}>
                {[...Array(8)].map((_, id) => <ThemeItemAdminSkeleton key={id} />)}
            </div>
            : error ? <NotContent text="Ошибка при загрузке тем" />
            : themes?.themes?.length > 0 ? <div className={styles.appearanceContent}>
                {themes.themes.map((data, id) => 
                    <ThemeItemAdmin
                        key={id}
                        data={data}
                        themeDelete={() => removeTheme(data.id)}
                        loading={themeIsLoading.includes(data.id)}
                    />)}
            </div>
            : <NotContent text="Тем не найдено" />}

            {themesMoreLoading && <div className={styles.appearanceContent}>
                {[...Array(4)].map((_, id) => <ThemeItemAdminSkeleton key={id} />)}
            </div>}

            {themes?.themes?.length > 0 && !themesIsLoading && !themes?.isLast && <Button loading={themesMoreLoading} type="empty" auto className={styles.themesMoreButton} onClick={loadMoreThemes}>
                Показать еще
            </Button>}
        </div>
    )
}

export default Appearance;