import React from 'react';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from '../AddTheme/index.module.css';

import useAdmin from '../../../../hooks/useAdmin';

import ReloadButton from '../../../../components/ReloadButton';
import Button from '../../../../components/Button';
import ThemeItemAdmin from '../../../../components/ThemeItem/ThemeItemAdmin';
import ThemeItemAdminSkeleton from '../../../../components/Skeleton/Theme/ThemeItemAdminSkeleton';
import NotContent from '../../../../components/NotContent';
import BlockDataWithPaggination from '../../../../components/BlockDataWithPaggination';
import { Cross } from '../../../../components/Icons';

const Appearance = () => {
    const [themesMoreLoading, setThemesMoreLoading] = React.useState(false);
    const {themesIsLoading, themes} = useSelector(state => state.admin);
    const {themeIsLoading, error, loadAllThemes, getAllThemes, removeTheme} = useAdmin();

    const loadMoreThemes = async () => {
        setThemesMoreLoading(true);
        await getAllThemes(themes?.themes?.length, 8);
        setThemesMoreLoading(false);
    };

    React.useEffect(() => {
        loadAllThemes(0, 8);
    }, []);

    React.useEffect(() => {
        if(themes?.themes?.length === 0 && !themes?.isLast){
            loadMoreThemes();
        }
    }, [themes?.themes, themes?.isLast]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Темы {!themesIsLoading && `(${themes.totalCount || 0})`}</p>

                    <ReloadButton loading={themesIsLoading} onClick={() => loadAllThemes(0, 8, true)} />
                </div>

                <Button disabled={themesIsLoading} type="light" auto to="theme/add">
                    Создать
                </Button>
            </div>

            <BlockDataWithPaggination
                error={error}
                dataIsLoading={themesIsLoading}
                dataMoreIsLoading={themesMoreLoading}
                dataLength={themes?.themes?.length}
                Skeleton={ThemeItemAdminSkeleton}
                skeletonLoading={8}
                skeletonMoreLoading={4}
                containerClassName={base.contentItems}
                errorContent={<NotContent text="Ошибка при загрузке тем" icon={<Cross />} danger />}
                notContent={<NotContent text="Тем не найдено" />}
                isLast={themes?.isLast}
                loadMoreData={loadMoreThemes}
            >
                {themes?.themes?.map((data, id) => 
                    <ThemeItemAdmin
                        key={id}
                        data={data}
                        themeDelete={() => removeTheme(data.id)}
                        loading={themeIsLoading.includes(data.id)}
                    />
                )}
            </BlockDataWithPaggination>
        </div>
    )
}

export default Appearance;