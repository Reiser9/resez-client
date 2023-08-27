import React from 'react';
import { Checkbox, ColorPicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import { CONFIG } from '../../../consts/CONFIG';

import { isPreviewTheme, previewThemeUser } from '../../../redux/slices/user';

import {convertHexToOpacityHex} from '../../../utils/convertColor';
import { setMainColors } from '../../../utils/setMainColors';

import useAdmin from '../../../hooks/useAdmin';
import useTheme from '../../../hooks/useTheme';

import BackButton from '../../../components/BackButton';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Preloader from '../../../components/Preloader';

const AddTheme = ({edit = false}) => {
    const [mainPickEnd, setMainPickEnd] = React.useState(false);
    const [secondPickEnd, setSecondPickEnd] = React.useState(false);

    const [mainColor, setMainColor] = React.useState(CONFIG.BASE_COLOR);
    const [mainColorFormatHex, setMainColorFormatHex] = React.useState('hex');

    const [customSecondColor, setCustomSecondColor] = React.useState(edit ? false : true);

    const [secondColor, setSecondColor] = React.useState(CONFIG.BASE_COLOR);
    const [secondColorFormatHex, setSecondColorFormatHex] = React.useState('hex');

    const [themeRating, setThemeRating] = React.useState(false);
    const [preview, setPreview] = React.useState(false);

    const {isLoading, createTheme, editTheme} = useAdmin();
    const {isLoading: themeIsLoading, getThemeById} = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const {id} = useParams();

    const mainHexString = React.useMemo(() => (typeof mainColor === 'string' ? mainColor : mainColor.toHexString()), [mainColor]);
    const secondHexString = React.useMemo(() => (typeof secondColor === 'string' ? secondColor : secondColor.toHexString()), [secondColor]);

    const createThemeHandler = () => {
        createTheme(mainHexString, !customSecondColor ? secondHexString : convertHexToOpacityHex(mainHexString), themeRating, () => navigate("/admin/appearance"));
    }

    const editThemeHandler = () => {
        editTheme(id, mainHexString, !customSecondColor ? secondHexString : convertHexToOpacityHex(mainHexString), themeRating, () => navigate("/admin/appearance"));
    }

    const getCurrentTheme = async (id) => {
        const theme = await getThemeById(id);

        if(!theme){
            navigate("/admin/appearance");
        }

        setMainColor(theme?.primary);
        setSecondColor(theme?.light);
        setThemeRating(theme?.isRatingEnabled);
    }

    React.useEffect(() => {
        if(preview){
            setMainColors(mainHexString, !customSecondColor ? secondHexString : convertHexToOpacityHex(mainHexString));
            dispatch(isPreviewTheme(true));
            dispatch(previewThemeUser({
                primary: mainHexString,
                light: !customSecondColor ? secondHexString : convertHexToOpacityHex(mainHexString)
            }));
        }
        else{
            setMainColors(user?.theme?.primary, user?.theme?.light);
            dispatch(isPreviewTheme(false));
        }

        return () => {
            setMainColors(user?.theme?.primary, user?.theme?.light);
            dispatch(isPreviewTheme(false))
        };
    }, [preview, mainPickEnd, secondPickEnd, customSecondColor]);

    React.useEffect(() => {
        if(edit && id){
            getCurrentTheme(id);
        }
    }, [id]);

    if(themeIsLoading){
        return <Preloader page />
    }

    return (
        <div className={styles.appearance}>
            <div className={styles.appearanceTitleInner}>
                <BackButton />

                <p className={typography.h3}>{edit ? "Редактировать тему" : "Создать тему"}</p>
            </div>

            <div className={styles.appearanceThemeForm}>
                <ColorPicker onChangeComplete={() => setMainPickEnd(prev => !prev)} value={mainColor} onChange={setMainColor} format={mainColorFormatHex} className={styles.appearanceColorPicker} onFormatChange={setMainColorFormatHex}>
                    <Input readOnly value={mainHexString} title="Выберите основной цвет">
                        <div className={styles.appearanceThemeColorView} style={{background: mainHexString}}></div>
                    </Input>
                </ColorPicker>

                <Checkbox checked={customSecondColor} onChange={e => setCustomSecondColor(e.target.checked)} className={styles.appearanceThemeCheckbox}>
                    Сгенировать цвет автоматически
                </Checkbox>

                {!customSecondColor && <ColorPicker onChangeComplete={() => setSecondPickEnd(prev => !prev)} value={secondColor} onChange={setSecondColor} format={secondColorFormatHex} className={styles.appearanceColorPicker} onFormatChange={setSecondColorFormatHex}>
                    <Input readOnly value={secondHexString} title="Выберите фоновый цвет">
                        <div className={styles.appearanceThemeColorView} style={{background: secondHexString}}></div>
                    </Input>
                </ColorPicker>}

                <Checkbox checked={themeRating} onChange={e => setThemeRating(e.target.checked)} className={styles.appearanceThemeCheckbox}>
                    Оценка темы пользователями
                </Checkbox>

                <Checkbox checked={preview} onChange={e => setPreview(e.target.checked)} className={styles.appearanceThemeCheckbox}>
                    Предпросмотр
                </Checkbox>

                {edit
                ? <Button auto type="light" loading={isLoading} onClick={editThemeHandler}>
                    Сохранить
                </Button>
                : <Button auto type="light" loading={isLoading} onClick={createThemeHandler}>
                    Создать
                </Button>}
            </div>
        </div>
    )
}

export default AddTheme;