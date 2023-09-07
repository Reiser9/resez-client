import React from 'react';

import styles from './index.module.css';
import typography from '../../../../styles/typography.module.css';

import useUser from '../../../../hooks/useUser';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import DatePicker from '../../../../components/DatePicker';
import Select from '../../../../components/Select';

const Data = () => {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [sex, setSex] = React.useState("Мужской");

    const {isLoading, changeData} = useUser();

    const changeDataHandler = () => {
        if(birthday){
            var birthdayTemp = birthday?.format("YYYY-MM-DD");
        }

        changeData(name, surname, birthdayTemp, sex);
    }

    return (
        <div className={styles.data}>
            <p className={typography.h3}>Личные данные</p>

            <div className={styles.dataContent}>
                <Input placeholder="Имя" value={name} setValue={setName} wrapperClass={styles.dataItem} />
                <Input placeholder="Фамилия" value={surname} setValue={setSurname} wrapperClass={styles.dataItem} />
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