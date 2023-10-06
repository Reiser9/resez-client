import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';

import {
    initSubjects,
    setSubjectsIsLoading,
    deleteSubject,
    addNewSubject,
    setTasksIsLoading,
    initTasks,
    setTasks,
    deleteTask,
    changeSubject,
    addNewTask
} from '../redux/slices/admin';
import { addNewTest, initTest, initTests, setTests, setTestsIsLoading } from '../redux/slices/test';

import useRequest from './useRequest';
import useAlert from './useAlert';
import useError from './useError';

const useTest = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [subjectIsLoading, setSubjectIsLoading] = React.useState([]);
    const [taskIsLoading, setTaskIsLoading] = React.useState([]);

    const {alertNotify} = useAlert();
    const {request} = useRequest();
    const {errorController} = useError();
    const dispatch = useDispatch();
    const {subjects, tasks} = useSelector(state => state.admin);
    const {tests} = useSelector(state => state.test);

    // Предметы
    const loadSubjects = async (reload = false) => {
        setError(false);

        if(!subjects.subjects || reload){
            dispatch(setSubjectsIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, "subject", HTTP_METHODS.GET, true);

            dispatch(setSubjectsIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => loadSubjects(reload));
            }

            dispatch(initSubjects(response.data));
        }
    }

    const getSubjectById = async (id) => {
        setError(false);

        setIsLoading(true)

        const response = await request(REQUEST_TYPE.ADMIN, `subject/${id}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => getSubjectById(id));
        }

        return response.data.subject;
    }

    const createSubject = async (subject, isPublished, subjectTasks, successCallback = () => {}) => {
        setIsLoading(true);

        if(!subject){
            return alertNotify("Предупреждение", "Название предмета не может быть пустым", "warn");
        }

        const response = await request(REQUEST_TYPE.ADMIN, "subject", HTTP_METHODS.POST, true, {
            subject,
            isPublished,
            subjectTasks
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => createSubject(subject, isPublished, subjectTasks, successCallback));
        }

        dispatch(addNewSubject(response.data.subject));
        alertNotify("Успешно", "Предмет создан", "success");
        successCallback();
    }

    const editSubject = async (id, subject, isPublished, subjectTasks, successCallback = () => {}) => {
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "subject", HTTP_METHODS.PUT, true, {
            id,
            subject,
            isPublished,
            subjectTasks
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => editSubject(id, subject, isPublished, subjectTasks, successCallback));
        }

        dispatch(changeSubject(response.data.subject));
        alertNotify("Успешно", "Предмет изменен", "success");
        successCallback();
    }

    const removeSubject = async (id, successCallback = () => {}) => {
        setSubjectIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.ADMIN, `subject/${id}`, HTTP_METHODS.DELETE, true);

        setSubjectIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            return errorController(response, () => removeSubject(id, successCallback));
        }

        dispatch(deleteSubject(response.data.subject));
        alertNotify("Успешно", "Предмет удален", "success");
        successCallback();
    }

    const getShortSubjects = async () => {
        const response = await request(REQUEST_TYPE.EMPTY, "subject", HTTP_METHODS.GET);

        if(requestDataIsError(response)){
            return errorController(response, () => {}, "", () => {});
        }

        return response.data.subjects;
    }

    const getThemesBySubject = async (id) => {
        const response = await request(REQUEST_TYPE.ADMIN, `/subject/${id}/subject-task`, HTTP_METHODS.GET, true);

        // Поменять на запрос без авторизации
        if(requestDataIsError(response)){
            return errorController(response, () => getThemesBySubject(id), "", () => {});
        }

        return response.data.subjectTasks;
    }

    const getSubThemesByTheme = async (id) => {
        const response = await request(REQUEST_TYPE.ADMIN, `/subject-task/${id}/sub-theme`, HTTP_METHODS.GET, true);

        // Поменять на запрос без авторизации
        if(requestDataIsError(response)){
            return errorController(response, () => getSubThemesByTheme(id), "", () => {});
        }

        return response.data.subThemes;
    }

    // Задания
    const loadTasks = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!tasks.tasks || reload){
            dispatch(setTasksIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, `task?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setTasksIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => loadTasks(offset, limit, reload));
            }

            dispatch(initTasks(response.data));
        }
    }

    const getAllTasks = async (offset = 0, limit = 5) => {
        setError(false);

        if(tasks?.tasks?.length === 0 || tasks?.tasks?.length < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.ADMIN, `/task?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllTasks(offset, limit));
            }

            dispatch(setTasks(response.data));
        }
    }

    const removeTask = async (id, successCallback = () => {}) => {
        setTaskIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.ADMIN, `task/${id}`, HTTP_METHODS.DELETE, true);

        setTaskIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            return errorController(response, () => removeTask(id, successCallback));
        }

        dispatch(deleteTask(response.data.task));
        alertNotify("Успешно", "Задание удалено", "success");
        successCallback();
    }

    // isVerified - когда пользователи могут создать задания
    const createTask = async (subThemeId, task, solution, answer, successCallback = () => {}) => {
        if(!task){
            return alertNotify("Предупреждение", "Задание не может быть пустым", "warn");
        }
        if(!answer){
            return alertNotify("Предупреждение", "Ответ не может быть пустым", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "task", HTTP_METHODS.POST, true, {
            subThemeId,
            task,
            solution,
            answer,
            isVerified: true
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => createTask(subThemeId, task, solution, answer, successCallback));
        }

        dispatch(addNewTask(response.data.task));
        alertNotify("Успешно", "Задание создано", "success");
        successCallback();
    }

    // Тесты
    const loadTests = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!tests.tests || reload){
            dispatch(setTestsIsLoading(true));

            const response = await request(REQUEST_TYPE.TEST, `?offfset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setTestsIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);
                
                return errorController(response, () => loadTests(offset, limit, reload));
            }

            dispatch(initTests(response.data));
        }
    }

    const getTests = async (offset = 0, limit = 5) => {
        setError(false);

        if(tests?.tests?.length === 0 || tests?.tests?.length < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.TEST, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getTests(offset, limit));
            }

            dispatch(setTests(response.data));
        }
    }

    const getTestById = async (id) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.TEST, `/${id}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => getTestById(id));
        }

        dispatch(initTest(response.data.test));
    }

    const createTest = async (subjectId, isPrivate, successCallback = () => {}) => {
        if(!subjectId){
            return alertNotify("Предупреждение", "Сначала нужно выбрать предмет", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.TEST, "generate-exam", HTTP_METHODS.POST, true, {
            subjectId,
            isPrivate
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => createTest(subjectId, isPrivate, successCallback));
        }

        dispatch(addNewTest(response.data.test));
        alertNotify("Успешно", "Тест создан", "success");
        successCallback();
    }

    return{
        error,
        isLoading,
        subjectIsLoading,
        taskIsLoading,
        loadSubjects,
        getSubjectById,
        createSubject,
        editSubject,
        removeSubject,
        getShortSubjects,
        getThemesBySubject,
        getSubThemesByTheme,
        loadTasks,
        getAllTasks,
        removeTask,
        createTask,
        loadTests,
        getTestById,
        createTest,
        getTests
    }
}

export default useTest;