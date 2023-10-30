import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useSelector } from 'react-redux';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import { convertHtmlToEditorBlocks, getHtmlInEditor } from '../../../../utils/getHtmlInEditor';

import { PERMISSIONS } from '../../../../consts/PERMISSIONS';
import { checkPermission } from '../../../../utils/checkPermission';

import useTest from '../../../../hooks/useTest';

import CreatePageDefault from '../../../../components/CreatePageDefault';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Input from '../../../../components/Input';
import Editor from '../../../../components/Editor';
import Preloader from '../../../../components/Preloader';

const CreateTask = ({
    edit = false
}) => {
    const [subject, setSubject] = React.useState();
    const [subjectName, setSubjectName] = React.useState("");
    const [isVerified, setIsVerified] = React.useState(false);
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

    const [editingIsLoading, setEditingIsLoading] = React.useState(false);

    const taskRef = React.useRef(null);
    const solutionRef = React.useRef(null);

    const {isLoading, taskByIdIsLoading, getShortSubjects, getThemesBySubject, getSubThemesByTheme,
        createTask, getTaskById, updateTask} = useTest();
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useSelector(state => state.user);

    const taskHandler = async () => {
        const taskData = await taskRef.current.save();
        const taskContent = getHtmlInEditor(taskData.blocks);

        const solutionData = await solutionRef.current.save();
        const solutionContent = getHtmlInEditor(solutionData.blocks);

        if(edit){
            updateTask(id, subTheme, taskContent, solutionContent, answer, isVerified, () => navigate("../test"));
        }
        else{
            createTask(subTheme, taskContent, solutionContent, answer, isVerified, () => navigate("../test"));
        }
    }

    const subjectsDropdown = (open) => {
        if(open && subjects.length === 0){
            getSubjects();
        }
    }

    const getSubjects = async () => {
        setSubjectsIsLoading(true);
        const response = await getShortSubjects();
        setSubjectsIsLoading(false);

        if(!response){
            return;
        }

        setSubjects(response);
        setSubjectsFilter(response);
    }

    const themeDropdown = (open) => {
        if(open && themes.length === 0 && subject){
            getThemes(subject);
        }
    }
    
    const getThemes = async (subject) => {
        setThemesIsLoading(true);
        const response = await getThemesBySubject(subject);
        setThemesIsLoading(false);

        if(!response){
            return;
        }

        setThemes(response);
        setThemesFilter(response);
    }

    const subThemeDropdown = (open) => {
        if(open && subThemes.length === 0 && theme){
            getSubThemes(theme);
        }
    }

    const getSubThemes = async (theme) => {
        setSubThemesIsLoading(true);
        const response = await getSubThemesByTheme(theme);
        setSubThemesIsLoading(false);

        if(!response){
            return;
        }
        
        setSubThemes(response);
        setSubThemesFilter(response);
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

    const getTaskHandler = async () => {
        const currentTask = await getTaskById(id);
        const {subject, subjectTask, subTheme, task, solution, answer, isVerified} = currentTask || {};


        await Promise.all([
            getSubjects(),
            getThemes(subject?.id),
            getSubThemes(subjectTask?.id),
        ]);

        setSubject(subject?.id);
        setIsVerified(isVerified);
        setSubjectName(subject?.subject);
        setTheme(subjectTask?.id);
        setSubTheme(subTheme?.id);
        setAnswer(answer);
        setEditingIsLoading(true);

        setTimeout(() => {
            taskRef.current.render({
                blocks: convertHtmlToEditorBlocks(task)
            });
            solutionRef.current.render({
                blocks: convertHtmlToEditorBlocks(solution)
            });
        }, 100);
    }

    React.useEffect(() => {
        if(subject && !edit){
            setTheme();
            setThemes([]);
            setSubTheme();
            setSubThemes([]);
        }
    }, [subject]);

    React.useEffect(() => {
        if(theme && !edit){
            setSubTheme();
            setSubThemes([]);
        }
    }, [theme]);

    React.useEffect(() => {
        if(editingIsLoading){
            return setEditingIsLoading(false);
        }

        if(theme && edit){
            setSubTheme();
            setSubThemes([]);
        }
    }, [theme]);

    React.useEffect(() => {
        if(id && edit){
            getTaskHandler();
        }
    }, [id, edit]);

    if(taskByIdIsLoading){
        return <Preloader page />
    }

    return (
        <CreatePageDefault
            title={`${edit ? "Редактирование" : "Создание"} задания`}
            button={subTheme && <Button type="light" auto onClick={taskHandler} loading={isLoading}>
                    {edit ? "Сохранить" : "Создать"}
                </Button>}
        >
            <div className={base.formMedium}>
                {edit
                ? <div className={styles.selectDisabled}>
                    {subjectName}
                </div>
                : <Select
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
                />}

                {(subject || edit) && <Select
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

                {(theme || edit) && <Select 
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

                {(subTheme || edit) && <>
                    {checkPermission(user?.permissions, [PERMISSIONS.VERIFY_TASKS]) && <Checkbox checked={isVerified} onChange={e => setIsVerified(e.target.checked)}>
                        Задание проверено
                    </Checkbox>}

                    <Editor placeholder="Задание" ref={taskRef} id="taskEditor" />

                    <Editor placeholder="Решение" ref={solutionRef} id="answerEditor" />

                    <Input title="Ответ" value={answer} setValue={setAnswer} />
                </>}
            </div>
        </CreatePageDefault>
    )
}

export default CreateTask;