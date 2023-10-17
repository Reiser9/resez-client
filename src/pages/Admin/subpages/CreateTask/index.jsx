import React from 'react';
import { useNavigate } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import { getHtmlInEditor } from '../../../../utils/getHtmlInEditor';

import useTest from '../../../../hooks/useTest';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Input from '../../../../components/Input';
import Editor from '../../../../components/Editor';

const CreateTask = ({
    edit = false
}) => {
    const [subject, setSubject] = React.useState();
    const [theme, setTheme] = React.useState();
    const [subTheme, setSubTheme] = React.useState();
    const [answer, setAnswer] = React.useState("");

    const [subjects, setSubjects] = React.useState([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState([]);
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [themes, setThemes] = React.useState([]);
    const [themesFilter, setThemesFilter] = React.useState([]);
    const [themesIsLoading, setThemesIsLoading] = React.useState(false);
    const [subThemes, setSubThemes] = React.useState([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState([]);
    const [subThemesIsLoading, setSubThemesIsLoading] = React.useState(false);

    const taskRef = React.useRef(null);
    const solutionRef = React.useRef(null);

    const {isLoading, getShortSubjects, getThemesBySubject, getSubThemesByTheme, createTask} = useTest();
    const navigate = useNavigate();

    const createTaskHandler = async () => {
        const taskData = await taskRef.current.save();
        const taskContent = getHtmlInEditor(taskData.blocks);

        const solutionData = await solutionRef.current.save();
        const solutionContent = getHtmlInEditor(solutionData.blocks);

        createTask(subTheme, taskContent, solutionContent, answer, () => navigate("../test"));
    }

    const subjectsDropdown = (open) => {
        if(open && subjects.length === 0){
            setSubjectsIsLoading(true);
            getShortSubjects().then(subjects => {
                setSubjectsIsLoading(false);
                if(!subjects){
                    return;
                }
    
                setSubjects(subjects);
                setSubjectsFilter(subjects);
            });
        }
    }

    const themeDropdown = (open) => {
        if(open && themes.length === 0 && subject){
            setThemesIsLoading(true);
            getThemesBySubject(subject).then(themes => {
                setThemesIsLoading(false);
                if(!themes){
                    return;
                }
    
                setThemes(themes);
                setThemesFilter(themes);
            });
        }
    }

    const subThemeDropdown = (open) => {
        if(open && subThemes.length === 0 && theme){
            setSubThemesIsLoading(true);
            getSubThemesByTheme(theme).then(subThemes => {
                setSubThemesIsLoading(false);
                if(!subThemes){
                    return;
                }
                
                setSubThemes(subThemes);
                setSubThemesFilter(subThemes);
            });
        }
    }

    const handleSearchSubject = (value) => {
        const filteredOptions = subjects.filter(subject =>
            subject.subject.toLowerCase().includes(value.toLowerCase())
        );

        setSubjectsFilter(filteredOptions);
    }

    const handleSearchThemes = (value) => {
        const filteredOptions = themes.filter(theme => {
            const themeTemp = `${theme.number}. ${theme.theme}`;
            return themeTemp.toLowerCase().includes(value.toLowerCase());
        });

        setThemesFilter(filteredOptions);
    }

    const handleSearchSubThemes = (value) => {
        const filteredOptions = subThemes.filter(subTheme =>
            subTheme.subTheme.toLowerCase().includes(value.toLowerCase())
        );

        setSubThemesFilter(filteredOptions);
    }

    React.useEffect(() => {
        if(subject && theme){
            setTheme();
            setThemes([]);
            setSubTheme();
            setSubThemes([]);
        }
    }, [subject]);

    React.useEffect(() => {
        if(theme && subTheme){
            setSubTheme();
            setSubThemes([]);
        }
    }, [theme]);

    return (
        <CreatePageDefault
            title={`${edit ? "Редактирование" : "Создание"} задания`}
            button={subTheme && (edit
                ? <Button type="light" auto loading={isLoading}>
                    Сохранить
                </Button>
                : <Button type="light" auto onClick={createTaskHandler} loading={isLoading}>
                    Создать
                </Button>)}
        >
            <div className={base.formMedium}>
                <Select
                    placeholder="Предмет"
                    notContentText="Предметов не найдено"
                    loading={subjectsIsLoading}
                    onDropdownVisibleChange={subjectsDropdown}
                    value={subject}
                    onChange={value => {
                        setSubject(value);
                        setSubjectsFilter(subjects);
                    }}
                    options={subjectsFilter?.map(data => {
                        return {
                            label: data.subject,
                            value: data.id
                        }
                    })}
                    showSearch
                    onSearch={handleSearchSubject}
                    filterOption={false}
                />

                {subject && <Select
                    placeholder="Номер задания"
                    notContentText="Заданий не найдено"
                    loading={themesIsLoading}
                    onDropdownVisibleChange={themeDropdown}
                    value={theme}
                    onChange={value => {
                        setTheme(value);
                        setThemesFilter(themes);
                    }}
                    options={themesFilter?.map(data => {
                        return {
                            label: `${data.number}. ${data.theme}`,
                            value: data.id
                        }
                    })}
                    showSearch
                    onSearch={handleSearchThemes}
                    filterOption={false}
                />}

                {theme && <Select 
                    placeholder="Тема"
                    notContentText="Тем не найдено"
                    loading={subThemesIsLoading}
                    onDropdownVisibleChange={subThemeDropdown}
                    value={subTheme}
                    onChange={value => {
                        setSubTheme(value);
                        setSubThemesFilter(subThemes);
                    }}
                    options={subThemesFilter?.map(data => {
                        return {
                            label: data.subTheme,
                            value: data.id
                        }
                    })}
                    showSearch
                    onSearch={handleSearchSubThemes}
                    filterOption={false}
                />}

                {subTheme && <>
                    <Editor placeholder="Задание" ref={taskRef} id="taskEditor" />

                    <Editor placeholder="Решение" ref={solutionRef} id="answerEditor" />

                    <Input title="Ответ" value={answer} setValue={setAnswer} />
                </>}
            </div>
        </CreatePageDefault>
    )
}

export default CreateTask;