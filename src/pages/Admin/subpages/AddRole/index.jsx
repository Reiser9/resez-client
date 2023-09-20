import React from 'react';
import { Checkbox, ColorPicker, Tree } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { CONFIG } from '../../../../consts/CONFIG';

import { convertHexToOpacityHex } from '../../../../utils/convertColor';

import useRoles from '../../../../hooks/useRoles';

import BackButton from '../../../../components/BackButton';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Preloader from '../../../../components/Preloader';

const AddRole = ({edit = false}) => {
    const [name, setName] = React.useState("");

    const [textColor, setTextColor] = React.useState(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState('hex');

    const [backgroundColor, setBackgroundColor] = React.useState(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState('hex');

    const textHexString = React.useMemo(() => (typeof textColor === 'string' ? textColor : textColor.toHexString()), [textColor]);
    const backgroundHexString = React.useMemo(() => (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHexString()), [backgroundColor]);

    const [backgroundColorAuto, setBackgroundColorAuto] = React.useState(edit ? false : true);

    const [currentPermissions, setCurrentPermissions] = React.useState([]);
    const [permission, setPermission] = React.useState([]);

    const {isLoading, roleByIdIsLoading, getAllPermissions, createRole, getRoleById} = useRoles();
    const {permissionsIsLoading, permissions} = useSelector(state => state.role);
    const navigate = useNavigate();
    const {id} = useParams();

    const onCheckPermission = (value) => {
        setPermission(value);
    }

    const createRoleHandler = () => {
        const backbroundTextColor = backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString;

        createRole(name, permission, textHexString, backbroundTextColor, () => navigate("../roles"));
    }

    const formatArrayToTree = (arr) => arr.map(item => ({
        title: item.permission,
        key: item.id.toString(),
        children: formatArrayToTree(item.childrens) ?? []
    }));

    const getCurrentRole = React.useCallback(async (id) => {
        const role = await getRoleById(id);

        if(!role){
            navigate("/admin/roles");
        }

        setName(role?.role);
        setTextColor(role?.textColor);
        setBackgroundColor(role?.backgroundColor);

        const perm = role?.permissions.map(data => data.id.toString());
        setPermission(perm);
    }, [id]);

    React.useEffect(() => {
        getAllPermissions();
    }, []);

    React.useEffect(() => {
        if(permissions?.length === 0){
            return;
        }

        const formattedPermissions = formatArrayToTree(permissions);
        setCurrentPermissions(formattedPermissions);
    }, [permissions]);

    React.useEffect(() => {
        if(edit && id){
            getCurrentRole(id);
        }
    }, [edit, id, getCurrentRole]);

    if(permissionsIsLoading || roleByIdIsLoading){
        return <Preloader page />
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleWrapper}>
                <BackButton />

                <p className={typography.h3}>{edit ? "Редактирование" : "Создание"} роли</p>
            </div>

            <div className={styles.roleForm}>
                <div className={styles.rolePreview}>
                    <p className={typography.text2}>Предпросмотр:</p>

                    <div className={styles.rolePreviewItem} style={{color: textHexString, background: backgroundColorAuto ? convertHexToOpacityHex(textHexString) : backgroundHexString}}>
                        {name ? name : "Название роли"}
                    </div>
                </div>

                <Input value={name} setValue={setName} title="Название роли" placeholder="Админ, модератор, хелпер.." trackLength lengthLimit={30} />

                <ColorPicker value={textColor} onChange={setTextColor} format={textColorFormatHex} onFormatChange={setTextColorFormatHex}>
                    <Input readOnly value={textHexString} title="Выберите цвет текста">
                        <div className={styles.colorView} style={{background: textHexString}}></div>
                    </Input>
                </ColorPicker>

                <Checkbox checked={backgroundColorAuto} onChange={e => setBackgroundColorAuto(e.target.checked)}>
                    Сгенировать фоновый цвет автоматически
                </Checkbox>

                {!backgroundColorAuto && <ColorPicker value={backgroundColor} onChange={setBackgroundColor} format={backgroundColorFormatHex} onFormatChange={setBackgroundColorFormatHex}>
                    <Input readOnly value={backgroundHexString} title="Выберите цвет фона">
                        <div className={styles.colorView} style={{background: backgroundHexString}}></div>
                    </Input>
                </ColorPicker>}

                <div className={styles.roleTree}>
                    <Tree
                        selectable={false}
                        checkable
                        defaultExpandAll
                        onCheck={onCheckPermission}
                        checkedKeys={permission}
                        treeData={currentPermissions}
                    />
                </div>

                {edit ? <Button type="light" auto loading={isLoading}>
                    Сохранить
                </Button>
                : <Button type="light" auto onClick={createRoleHandler} loading={isLoading}>
                    Создать
                </Button>}
            </div>
        </div>
    )
}

export default AddRole;