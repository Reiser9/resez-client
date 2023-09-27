import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';

import { initSubjects, setSubjectsIsLoading, deleteSubject, addNewSubject } from '../redux/slices/admin';

import useRequest from './useRequest';
import useAlert from './useAlert';
import useError from './useError';

const useTest = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [subjectIsLoading, setSubjectIsLoading] = React.useState([]);

    const {alertNotify} = useAlert();
    const {request} = useRequest();
    const {errorController} = useError();
    const dispatch = useDispatch();
    const {subjects} = useSelector(state => state.admin);

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

        console.log(response.data);
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

        alertNotify("Успешно", "Предмет изменен", "success");
        successCallback();
        console.log(response);
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
        console.log(response);
    }

    return{
        error,
        isLoading,
        subjectIsLoading,
        loadSubjects,
        getSubjectById,
        createSubject,
        editSubject,
        removeSubject
    }
}

export default useTest;