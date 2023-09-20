import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useUser from '../../../../hooks/useUser';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import DatePicker from '../../../../components/DatePicker';
import Select from '../../../../components/Select';
import Preloader from '../../../../components/Preloader';

const Data = () => {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [sex, setSex] = React.useState(null);

    const {isLoading, profileInfoIsLoading, changeData, getProfileInfo} = useUser();
    const {profileData} = useSelector(state => state.user);

    const changeDataHandler = () => {
        if(birthday){
            var birthdayTemp = birthday?.format("YYYY-MM-DD");
        }

        changeData(name, surname, birthdayTemp, sex);
    }

    React.useEffect(() => {
        getProfileInfo();
    }, []);

    React.useEffect(() => {
        if(Object.keys(profileData).length !== 0){
            const {firstName, lastName, birthDate, gender} = profileData;

            setName(firstName || "");
            setSurname(lastName || "");
            setBirthday(birthDate ? dayjs(birthDate) : "");
            setSex(gender || null);
        }
    }, [profileData]);

    if(profileInfoIsLoading){
        return <Preloader page /> // Заменить на скелетон после готовности страницы профиля
    }

    return (
        <div className={base.baseWrapperGap16}>
            <p className={typography.h3}>Личные данные</p>

            <div className={base.contentItems}>
                <Input value={name} setValue={setName} wrapperClass={styles.dataItem} title="Имя" lengthLimit={20} trackLength />
                <Input value={surname} setValue={setSurname} wrapperClass={styles.dataItem} title="Фамилия" lengthLimit={30} trackLength />
                <DatePicker placeholder="Дата рождения" value={birthday} setValue={setBirthday} className={styles.dataItem} />
                <Select placeholder="Пол" value={sex} onChange={setSex} className={styles.dataItem} options={[
                    {
                        label: "Мужской",
                        value: "Мужской"
                    },
                    {
                        label: "Женский",
                        value: "Женский"
                    }
                ]} />
            </div>

            <Button auto className={styles.dataButton} loading={isLoading} onClick={changeDataHandler}>
                Сохранить
            </Button>
        </div>
    )
}

export default Data;