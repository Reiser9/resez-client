import React from 'react';
import { Checkbox } from 'antd';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import {isDateTimePast} from '../../../utils/isDateTimePast';

import useAdmin from '../../../hooks/useAdmin';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import DatePicker from '../../../components/DatePicker';
import TimePicker from '../../../components/TimePicker';
import { formatDate } from '../../../utils/formatDate';

const Notifies = () => {
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [text, setText] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

    const {isLoading, sendNotify} = useAdmin();

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendForOne, setSendForOne] = React.useState(false);
    const [delayedSend, setDelayedSend] = React.useState(false);

    const createNotify = () => {
        if(delayedSend && !isDateTimePast(date, time)){
            return alert("Ошибка");
        }

        if(delayedSend){
            var newDate = formatDate(`${date?.format("YYYY-MM-DD")}T${time?.format("HH:mm:ss")}`, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        }

        sendNotify(title, author, [], newDate, text);
    }

    return (
        <div className={styles.notifies}>
            <p className={typography.h3}>Отправка уведомления</p>

            <div className={styles.notifiesForm}>
                <Input value={title} setValue={setTitle} title="Заголовок" />

                <Checkbox className={styles.notifiesCheckbox} checked={sendAnonim} onChange={e => setSendAnonim(e.target.checked)}>
                    Отправить от имени
                </Checkbox>

                {sendAnonim && <Input value={author} setValue={setAuthor} placeholder="От кого отправить" />}

                <Checkbox className={styles.notifiesCheckbox} checked={sendForOne} onChange={e => setSendForOne(e.target.checked)}>
                    Отправить пользователю
                </Checkbox>

                {sendForOne && <Select />}

                <Checkbox className={styles.notifiesCheckbox} checked={delayedSend} onChange={e => setDelayedSend(e.target.checked)}>
                    Отложенная отправка
                </Checkbox>

                {delayedSend && <div className={styles.notifiesDelayInner}>
                    <DatePicker placeholder="Выберите дату" className={styles.notifiesDelayItem} value={date} onChange={e => setDate(e)} />
                    <TimePicker placeholder="Выберите время" format="HH:mm" className={styles.notifiesDelayItem} value={time} onChange={e => setTime(e)} />
                </div>}

                <Textarea value={text} setValue={setText} title="Сообщение" />

                <Button auto type="light" onClick={createNotify} loading={isLoading}>
                    Отправить
                </Button>
            </div>
        </div>
    )
}

export default Notifies;