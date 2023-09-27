import React from 'react';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Input from '../../../../components/Input';
import Editor from '../../../../components/Editor';

const CreateTask = ({
    edit = false
}) => {
    const taskRef = React.useRef(null);
    const answerRef = React.useRef(null);

    return (
        <CreatePageDefault title={`${edit ? "Редактирование" : "Создание"} задания`}>
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

                <Select 
                    placeholder="Задание"
                    showSearch
                    options={[
                        {
                            key: "1",
                            value: "1) Тригонометрия"
                        },
                        {
                            key: "2",
                            value: "2) Геометрия"
                        },
                        {
                            key: "3",
                            value: "3) Авторский курс"
                        }
                    ]}
                />

                <Select 
                    placeholder="Тема"
                    showSearch
                    options={[
                        {
                            key: "1",
                            value: "Синусы"
                        },
                        {
                            key: "2",
                            value: "Косинусы"
                        },
                        {
                            key: "3",
                            value: "Писинус"
                        },
                        {
                            key: "4",
                            value: "Тангенсы"
                        }
                    ]}
                />

                <Editor placeholder="Задание" ref={taskRef} id="taskEditor" />

                <Editor placeholder="Решение" ref={answerRef} id="answerEditor" />

                <Input title="Ответ" />

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

export default CreateTask;