import { APP_STATUSES } from '../consts/APP_STATUSES';

import useRequest from './useRequest';
import useAlert from './useAlert';

const useError = () => {
    const {noAuthController} = useRequest();
    const {alertNotify} = useAlert();

    const errorController = async (response, callback = () => {}, errorMessage = "", customLogic, notAuthCallback) => {
        switch(response){
            case APP_STATUSES.SERVER_NOT_AVAILABLE:
                return;
            case APP_STATUSES.YOUR_BLOCKED:
                return;
            case APP_STATUSES.NOT_AUTH:
                if(notAuthCallback){
                    return notAuthCallback();
                }
                else{
                    return noAuthController(() => callback());
                }
            case APP_STATUSES.TOO_MANY_REQUESTS:
                return alertNotify("Ошибка", "Слишком много запросов, пожалуйста, подождите", "error");
            default:
                if(customLogic){
                    return customLogic();
                }
                else{
                    return alertNotify("Ошибка", errorMessage ? errorMessage : response?.data?.message || "Что-то поломалось, скоро починим", "error");
                }
        }
    }

    return{
        errorController
    }
}

export default useError;