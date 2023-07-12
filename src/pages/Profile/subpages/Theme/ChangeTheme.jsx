import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.css';

import useTheme from '../../../../hooks/useTheme';

import ThemeItem from '../../../../components/ThemeItem';

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
            ? <p>Загрузка...</p> //Скелетон
            : themes.map(data => <ThemeItem
                                    key={data.id}
                                    data={data}
                                    onClick={() => editTheme(data.id)}
                                    active={user?.theme?.id === data.id}
                                />)}
        </div>
    )
}

export default ChangeTheme;