import React from 'react';
import { Checkbox, DatePicker } from 'antd';

import typography from '../../../styles/typography.module.css';
import styles from '../index.module.css';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

const Notifies = () => {
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [text, setText] = React.useState("");

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendAll, setSendAll] = React.useState(true);
    const [delayedSend, setDelayedSend] = React.useState(false);

    return (
        <div className={styles.notifies}>
            <p className={typography.h3}>Отправка уведомления</p>

            <div className={styles.notifiesForm}>
                <Input value={title} setValue={setTitle} title="Заголовок" />

                <Checkbox checked={sendAnonim} onChange={e => setSendAnonim(e.target.checked)}>
                    Отправить анонимно
                </Checkbox>

                {!sendAnonim && <Input value={author} setValue={setAuthor} title="От кого отправить" />}

                <Checkbox checked={sendAll} onChange={e => setSendAll(e.target.checked)}>
                    Отправить всем пользователя
                </Checkbox>

                {!sendAll && <Select />}

                <Checkbox checked={delayedSend} onChange={e => setDelayedSend(e.target.checked)}>
                    Отложенная отправка
                </Checkbox>

                {delayedSend && <DatePicker showTime placeholder="Выберите дату и время" className={styles.datepicker} />}

                <Textarea value={text} setValue={setText} title="Сообщение" />

                <Button auto type="light">
                    Отправить
                </Button>
            </div>
        </div>
    )
}

export default Notifies;