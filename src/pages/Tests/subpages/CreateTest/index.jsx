import React from 'react';
import { Checkbox } from 'antd';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';

const CreateTest = ({
    edit = false
}) => {
    const [generateVariant, setGenerateVariant] = React.useState(false);
    const [isPrivate, setIsPrivate] = React.useState(false);

    return (
        <CreatePageDefault title={`${edit ? "Редактирование" : "Создание"} теста`}>
            <div className={base.formMedium}>
                <Select
                    placeholder="Предмет"
                    showSearch
                    options={[
                        {
                            key: "Русский язык",
                            value: "Русский язык"
                        },
                        {
                            key: "Математика",
                            value: "Математика"
                        },
                        {
                            key: "Литература",
                            value: "Литература"
                        }
                    ]}
                />

                <Checkbox value={generateVariant} onChange={e => setGenerateVariant(e.target.checked)}>
                    Сгенерировать вариант ЕГЭ
                </Checkbox>

                <Checkbox value={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
                    Скрыть от других пользователей
                </Checkbox>

                {edit
                ? <Button type="light" auto>
                    Сохранить
                </Button>
                : <Button type="light" auto>
                    Создать
                </Button>}
            </div>
        </CreatePageDefault>
    )
}

export default CreateTest;