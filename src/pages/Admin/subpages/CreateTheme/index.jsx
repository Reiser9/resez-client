import React from 'react';
import { Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';

import { CONFIG } from '../../../../consts/CONFIG';

import { isPreviewTheme, previewThemeUser } from '../../../../redux/slices/user';

import {convertHexToOpacityHex} from '../../../../utils/convertColor';
import { setMainColors } from '../../../../utils/setMainColors';

import useAdmin from '../../../../hooks/useAdmin';

import Button from '../../../../components/Button';
import Preloader from '../../../../components/Preloader';
import ColorPickerInput from '../../../../components/ColorPickerInput';
import CreatePageDefault from '../../../../components/CreatePageDefault';

const AddTheme = ({edit = false}) => {
    const [mainColor, setMainColor] = React.useState(CONFIG.BASE_COLOR);
    const [mainColorFormatHex, setMainColorFormatHex] = React.useState('hex');

    const [customSecondColor, setCustomSecondColor] = React.useState(edit ? false : true);

    const [secondColor, setSecondColor] = React.useState(CONFIG.BASE_COLOR);
    const [secondColorFormatHex, setSecondColorFormatHex] = React.useState('hex');

    const [themeRating, setThemeRating] = React.useState(false);
    const [preview, setPreview] = React.useState(false);

    const {isLoading, themeByIdIsLoading, createTheme, editTheme, getThemeById} = useAdmin();
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
            return navigate("/admin/appearance");
        }

        const {primary, light, isRatingEnabled} = theme || {};

        setMainColor(primary);
        setSecondColor(light);
        setThemeRating(isRatingEnabled);
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
    }, [preview, mainHexString, secondHexString, customSecondColor]);

    React.useEffect(() => {
        if(edit && id){
            getCurrentTheme(id);
        }
    }, [edit, id]);

    if(themeByIdIsLoading){
        return <Preloader page />
    }

    return (
        <CreatePageDefault title={`${edit ? "Редактирование" : "Создание"} темы`}>
            <div className={base.form}>
                <ColorPickerInput
                    title="Выберите основной цвет"
                    hexString={mainHexString}
                    value={mainColor}
                    format={mainColorFormatHex}
                    onFormatChange={setMainColorFormatHex}
                    onChangeComplete={(e) => setMainColor(e)}
                />

                <Checkbox checked={customSecondColor} onChange={e => setCustomSecondColor(e.target.checked)}>
                    Сгенировать цвет автоматически
                </Checkbox>

                {!customSecondColor && <ColorPickerInput
                    title="Выберите фоновый цвет"
                    hexString={secondHexString}
                    value={secondColor}
                    format={secondColorFormatHex}
                    onFormatChange={setSecondColorFormatHex}
                    onChangeComplete={(e) => setSecondColor(e)}
                />}

                <Checkbox checked={themeRating} onChange={e => setThemeRating(e.target.checked)}>
                    Оценка темы пользователями
                </Checkbox>

                <Checkbox checked={preview} onChange={e => setPreview(e.target.checked)}>
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
        </CreatePageDefault>
    )
}

export default AddTheme;