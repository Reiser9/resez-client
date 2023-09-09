import React from 'react';
import { Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import { formatDate } from '../../../utils/formatDate';
import {isDateTimePast} from '../../../utils/isDateTimePast';

import useAdmin from '../../../hooks/useAdmin';
import useAlert from '../../../hooks/useAlert';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import DatePicker from '../../../components/DatePicker';
import TimePicker from '../../../components/TimePicker';

const Notifies = () => {
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [text, setText] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

    const [searchValue, setSearchValue] = React.useState("");
    const [userSelectOpen, setUserSelectOpen] = React.useState(false);
    const [userOptions, setUserOptions] = React.useState([]);
    const [userIDs, setUserIDs] = React.useState([]);

    const [type, setType] = React.useState(null);
    const [typeOptions, setTypeOptions] = React.useState([]);

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendForOne, setSendForOne] = React.useState(false);
    const [delayedSend, setDelayedSend] = React.useState(false);

    const {isLoading, serchUsersLoading, notifyTypesIsLoading, sendNotify, serchUsers, getNotifyTypes} = useAdmin();
    const {alertNotify} = useAlert();
    const navigate = useNavigate();

    const searchUsersRef = React.useRef(null);

    const createNotify = () => {
        if((!date || !time) && delayedSend && !isDateTimePast(date, time)){
            return alertNotify("Ошибка", "Нельзя отправить уведомление в прошедшую дату", "error");
        }

        if(delayedSend){
            var newDate = formatDate(`${date?.format("YYYY-MM-DD")}T${time?.format("HH:mm:ss")}`, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        }

        sendNotify(title, author, userIDs, newDate, text, type, () => navigate("/admin"));
    }

    const searchUsersHandler = () => {
        setUserOptions([]);
        serchUsers(searchValue, true).then(users => {
            if(!users){
                return;
            }

            setUserOptions(users.data.users);
        });
    };

    const handleDropdownVisibleUsersChange = (open) => {
        setUserSelectOpen(open);

        if(open && userOptions.length === 0){
            searchUsersHandler();
        }
    }
    
    const handleDropdownVisibleTypeChange = (open) => {
        if(open && typeOptions.length === 0){
            getNotifyTypes().then(types => {
                if(!types){
                    return;
                }
    
                setTypeOptions(types.data.notifyTypes);
            });;
        }
    }

    React.useEffect(() => {
        if(!userSelectOpen){
            return;
        }

        searchUsersRef.current = setTimeout(searchUsersHandler, 500);

        return () => {
            clearTimeout(searchUsersRef.current);
        };
    }, [searchValue]);

    return (
        <div className={styles.notifies}>
            <p className={typography.h3}>Отправка уведомления</p>

            <div className={styles.notifiesForm}>
                <Input value={title} setValue={setTitle} placeholder="Заголовок" />

                <Checkbox className={styles.notifiesCheckbox} checked={sendAnonim} onChange={e => setSendAnonim(e.target.checked)}>
                    Отправить от имени
                </Checkbox>

                {sendAnonim && <Input value={author} setValue={setAuthor} placeholder="От кого отправить" />}

                <Checkbox className={styles.notifiesCheckbox} checked={sendForOne} onChange={e => setSendForOne(e.target.checked)}>
                    Отправить пользователю
                </Checkbox>

                {sendForOne && <Select
                    showSearch
                    placeholder="Пользователь"
                    mode="multiple"
                    maxTagCount="responsive"
                    notContentText="Пользователей не найдено"
                    loading={serchUsersLoading}
                    onSearch={value => setSearchValue(value.trim())}
                    onDropdownVisibleChange={handleDropdownVisibleUsersChange}
                    onChange={value => setUserIDs(value)}
                    filterOption={false}
                    options={userOptions.map(data => {
                        return {
                            label: data.nickname,
                            value: data.id
                        }
                    })}
                />}

                <Checkbox className={styles.notifiesCheckbox} checked={delayedSend} onChange={e => setDelayedSend(e.target.checked)}>
                    Отложенная отправка
                </Checkbox>

                {delayedSend && <div className={styles.notifiesDelayInner}>
                    <DatePicker disablePrevDate placeholder="Выберите дату" className={styles.notifiesDelayItem} value={date} onChange={e => setDate(e)} />
                    <TimePicker placeholder="Выберите время" format="HH:mm" className={styles.notifiesDelayItem} value={time} onChange={e => setTime(e)} />
                </div>}

                <Select
                    placeholder="Тип уведомления"
                    notContentText="Типов уведомления не найдено"
                    loading={notifyTypesIsLoading}
                    onDropdownVisibleChange={handleDropdownVisibleTypeChange}
                    onChange={value => setType(value)}
                    options={typeOptions.map(data => {
                        return {
                            label: data.type,
                            value: data.id
                        }
                    })}
                />

                <Textarea value={text} setValue={setText} placeholder="Сообщение" />

                <Button auto type="light" onClick={createNotify} loading={isLoading}>
                    Отправить
                </Button>
            </div>
        </div>
    )
}

export default Notifies;