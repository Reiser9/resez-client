import React from 'react';
import { Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import useTest from '../../../../hooks/useTest';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';

const CreateTest = ({
    edit = false
}) => {
    const [subject, setSubject] = React.useState();
    const [generateVariant, setGenerateVariant] = React.useState(false);
    const [isPrivate, setIsPrivate] = React.useState(false);

    const [subjects, setSubjects] = React.useState([]);
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);

    const {getShortSubjects, createTest} = useTest();
    const navigate = useNavigate();

    const subjectsDropdown = (open) => {
        if(open && subjects.length === 0){
            setSubjectsIsLoading(true);
            getShortSubjects().then(subjects => {
                setSubjectsIsLoading(false);
                if(!subjects){
                    return;
                }
    
                setSubjects(subjects);
            });
        }
    }

    const createTestHandler = () => {
        if(generateVariant){
            createTest(subject, isPrivate, () => {
                navigate("../my");
            });
        }
    }

    return (
        <CreatePageDefault title={`${edit ? "Редактирование" : "Создание"} теста`}>
            <div className={base.formMedium}>
                <Select
                    placeholder="Предмет"
                    notContentText="Предметов не найдено"
                    loading={subjectsIsLoading}
                    onDropdownVisibleChange={subjectsDropdown}
                    value={subject}
                    onChange={value => setSubject(value)}
                    options={subjects?.map(data => {
                        return {
                            label: data.subject,
                            value: data.id
                        }
                    })}
                />

                <Checkbox checked={generateVariant} onChange={e => setGenerateVariant(e.target.checked)}>
                    Сгенерировать вариант ЕГЭ
                </Checkbox>

                <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
                    Скрыть от других пользователей
                </Checkbox>

                {edit
                ? <Button type="light" auto>
                    Сохранить
                </Button>
                : <Button type="light" auto onClick={createTestHandler}>
                    Создать
                </Button>}
            </div>
        </CreatePageDefault>
    )
}

export default CreateTest;