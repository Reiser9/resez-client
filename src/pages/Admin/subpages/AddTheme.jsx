import React from 'react';
import { Checkbox, ColorPicker } from 'antd';
import { useNavigate } from 'react-router-dom';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import {convertHexToOpacityHex} from '../../../utils/convertColor';

import useAdmin from '../../../hooks/useAdmin';

import BackButton from '../../../components/BackButton';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const AddTheme = ({edit = false}) => {
    const [mainColor, setMainColor] = React.useState("#007cee");
    const [mainColorFormatHex, setMainColorFormatHex] = React.useState('hex');

    const [customSecondColor, setCustomSecondColor] = React.useState(edit ? false : true);

    const [secondColor, setSecondColor] = React.useState("#007cee");
    const [secondColorFormatHex, setSecondColorFormatHex] = React.useState('hex');

    const {isLoading, createTheme} = useAdmin();
    const navigate = useNavigate();

    const mainHexString = React.useMemo(
        () => (typeof mainColor === 'string' ? mainColor : mainColor.toHexString()),
        [mainColor]
    );

    const secondHexString = React.useMemo(
        () => (typeof secondColor === 'string' ? secondColor : secondColor.toHexString()),
        [secondColor]
    );

    const createThemeHandler = () => {
        createTheme(mainHexString, !customSecondColor ? secondHexString : convertHexToOpacityHex(mainHexString), () => navigate("/admin/appearance"));
    }

    return (
        <div className={styles.appearance}>
            <div className={styles.appearanceTitleInner}>
                <BackButton />

                <p className={typography.h3}>{edit ? "Редактировать тему" : "Создать тему"}</p>
            </div>

            <div className={styles.appearanceThemeForm}>
                <ColorPicker value={mainColor} onChange={setMainColor} format={mainColorFormatHex} className={styles.appearanceColorPicker} onFormatChange={setMainColorFormatHex}>
                    <Input readOnly value={mainHexString} title="Выберите основной цвет">
                        <div className={styles.appearanceThemeColorView} style={{background: mainHexString}}></div>
                    </Input>
                </ColorPicker>

                <Checkbox checked={customSecondColor} onChange={e => setCustomSecondColor(e.target.checked)} className={styles.appearanceThemeCheckbox}>
                    Сгенировать цвет автоматически
                </Checkbox>

                {!customSecondColor && <ColorPicker value={secondColor} onChange={setSecondColor} format={secondColorFormatHex} className={styles.appearanceColorPicker} onFormatChange={setSecondColorFormatHex}>
                    <Input readOnly value={secondHexString} title="Выберите фоновый цвет">
                        <div className={styles.appearanceThemeColorView} style={{background: secondHexString}}></div>
                    </Input>
                </ColorPicker>}

                {edit
                ? <Button auto type="light">
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