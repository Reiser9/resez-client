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
    addNewTask,
    setTaskCatalogIsLoading,
    initTaskCatalog,
    changeTask
} from '../redux/slices/admin';
import { addNewTest, deleteTest, initTest, initTests, setTests, setTestsIsLoading } from '../redux/slices/test';
import { initTableScore, setTableIsLoading } from '../redux/slices/info';

import useRequest from './useRequest';
import useAlert from './useAlert';
import useError from './useError';

const useTest = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [subjectIsLoading, setSubjectIsLoading] = React.useState([]);
    const [taskIsLoading, setTaskIsLoading] = React.useState([]);
    const [testCheckIsLoading, setTestCheckIsLoading] = React.useState(false);
    const [taskByIdIsLoading, setTaskByIdIsLoading] = React.useState(false);

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

            const response = await request(REQUEST_TYPE.ADMIN, "/subject", HTTP_METHODS.GET, true);

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

        const response = await request(REQUEST_TYPE.ADMIN, `/subject/${id}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => getSubjectById(id));
        }

        return response.data.subject;
    }

    const createSubject = async (subject, isPublished, subjectTasks, isMark, durationMinutes, successCallback = () => {}) => {
        if(!subject){
            return alertNotify("Предупреждение", "Название предмета не может быть пустым", "warn");
        }
        if(!durationMinutes){
            return alertNotify("Предупреждение", "Введите длительность экзамена", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/subject", HTTP_METHODS.POST, true, {
            subject,
            isPublished,
            subjectTasks,
            isMark,
            durationMinutes
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => createSubject(subject, isPublished, subjectTasks, isMark, durationMinutes, successCallback));
        }

        dispatch(addNewSubject(response.data.subject));
        successCallback();

        return response.data.subject.id; //Возвращаем id предмета, чтобы создать для нее таблицу
    }

    const editSubject = async (id, subject, isPublished, subjectTasks, isMark, durationMinutes, successCallback = () => {}) => {
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/subject", HTTP_METHODS.PUT, true, {
            id,
            subject,
            isPublished,
            subjectTasks,
            isMark,
            durationMinutes
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => editSubject(id, subject, isPublished, subjectTasks, isMark, durationMinutes, successCallback));
        }

        dispatch(changeSubject(response.data.subject));
        successCallback();
    }

    const createTablePoints = async (subjectId, scoreConversion, successCallback = () => {}) => {
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/score-conversion", HTTP_METHODS.POST, true, {
            subjectId,
            scoreConversion
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => createTablePoints(subjectId, scoreConversion, successCallback));
        }

        alertNotify("Успешно", "Предмет создан", "success");
        successCallback();
    }

    const removeSubject = async (id, successCallback = () => {}) => {
        setSubjectIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.ADMIN, `/subject/${id}`, HTTP_METHODS.DELETE, true);

        setSubjectIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            return errorController(response, () => removeSubject(id, successCallback));
        }

        dispatch(deleteSubject(response.data.subject));
        alertNotify("Успешно", "Предмет удален", "success");
        successCallback();
    }

    const getShortSubjects = async () => {
        const response = await request(REQUEST_TYPE.EMPTY, "/subject", HTTP_METHODS.GET);

        if(requestDataIsError(response)){
            return errorController(response, () => {}, "", () => {});
        }

        return response.data.subjects;
    }

    const getThemesBySubject = async (id) => {
        const response = await request(REQUEST_TYPE.SUBJECT, `/${id}/subject-task`, HTTP_METHODS.GET);

        if(requestDataIsError(response)){
            return errorController(response);
        }

        return response.data.subjectTasks;
    }

    const getSubThemesByTheme = async (id) => {
        const response = await request(REQUEST_TYPE.EMPTY, `/subject-task/${id}/sub-theme`, HTTP_METHODS.GET);

        if(requestDataIsError(response)){
            return errorController(response);
        }

        return response.data.subThemes;
    }

    const getPointsBySubjectId = async (subjectId, errorCallback = () => {}) => {
        dispatch(setTableIsLoading(true));

        const response = await request(REQUEST_TYPE.SUBJECT, `/${subjectId}/score-conversion`, HTTP_METHODS.GET);

        dispatch(setTableIsLoading(false));

        if(requestDataIsError(response)){
            return errorController(response, () => {}, "Предмет не найден", errorCallback);
        }

        dispatch(initTableScore(response.data));
    }

    // Задания
    const loadTasks = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!tasks.tasks || reload){
            dispatch(setTasksIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, `/task?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

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

        const response = await request(REQUEST_TYPE.ADMIN, `/task/${id}`, HTTP_METHODS.DELETE, true);

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

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/task", HTTP_METHODS.POST, true, {
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

    const updateTask = async (id, subThemeId, task, solution, answer, successCallback = () => {}) => {
        if(!task){
            return alertNotify("Предупреждение", "Задание не может быть пустым", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/task", HTTP_METHODS.PUT, true, {
            id,
            subThemeId,
            task,
            solution,
            answer,
            isVerified: true
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => updateTask(id, subThemeId, task, solution, answer, successCallback));
        }

        dispatch(changeTask(response.data.task));
        alertNotify("Успешно", "Задание изменено", "success");
        successCallback();
    }

    const getTaskById = async (id) => {
        setTaskByIdIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, `/task/${id}`, HTTP_METHODS.GET, true);

        setTaskByIdIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => getTaskById(id));
        }

        return response.data.task;
    }

    const getTasksBySubject = async (id, errorCallback = () => {}) => {
        setError(false);

        dispatch(setTaskCatalogIsLoading(true));

        const response = await request(REQUEST_TYPE.SUBJECT, `/${id}/task-info`, HTTP_METHODS.GET);

        dispatch(setTaskCatalogIsLoading(false));

        if(requestDataIsError(response)){
            return errorController(response, () => {}, "", errorCallback);
        }

        dispatch(initTaskCatalog(response.data.subjectTasks));
    }

    // Тесты
    const loadTests = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!tests.tests || reload){
            dispatch(setTestsIsLoading(true));

            const response = await request(REQUEST_TYPE.TEST, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

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

    const getTestById = async (id, errorCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.TEST, `/${id}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => getTestById(id, errorCallback), "Тест не найден", errorCallback);
        }

        dispatch(initTest(response.data.test));
    }

    const createTest = async (subjectId, isPrivate, successCallback = () => {}) => {
        if(!subjectId){
            return alertNotify("Предупреждение", "Сначала нужно выбрать предмет", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.TEST, "/generate-exam", HTTP_METHODS.POST, true, {
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

    const removeTest = async (id, successCallback = () => {}) => {
        setError(false);

        setSubjectIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.TEST, `/${id}`, HTTP_METHODS.DELETE, true);

        setSubjectIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            return errorController(response, () => removeTest(id, successCallback));
        }

        dispatch(deleteTest(response.data.test));
        alertNotify("Успешно", "Тест удален", "success");
        successCallback();
    }

    const checkDetailedTasks = async (id, successCallback = () => {}) => {
        setError(false);

        setTestCheckIsLoading(true);

        const response = await request(REQUEST_TYPE.TEST, `/${id}/detailed-answer-tasks`, HTTP_METHODS.GET);

        setTestCheckIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response);
        }

        successCallback();
        return response.data.tasks;
    }

    const checkTest = async (id, spentSeconds, tasksWithoutDetailedAnswer, tasksWithDetailedAnswer, successCallback = () => {}) => {
        setError(false);

        setTestCheckIsLoading(true);

        const response = await request(REQUEST_TYPE.TEST, "/check", HTTP_METHODS.POST, false, {
            id,
            spentSeconds,
            tasksWithoutDetailedAnswer,
            tasksWithDetailedAnswer
        });

        setTestCheckIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response);
        }

        successCallback();
        return response.data;
    }

    return{
        error,
        isLoading,
        subjectIsLoading,
        taskIsLoading,
        testCheckIsLoading,
        taskByIdIsLoading,
        loadSubjects,
        getSubjectById,
        createSubject,
        editSubject,
        createTablePoints,
        removeSubject,
        getShortSubjects,
        getThemesBySubject,
        getSubThemesByTheme,
        getPointsBySubjectId,
        loadTasks,
        getAllTasks,
        removeTask,
        createTask,
        updateTask,
        getTaskById,
        getTasksBySubject,
        loadTests,
        getTestById,
        getTests,
        createTest,
        removeTest,
        checkDetailedTasks,
        checkTest
    }
}

export default useTest;