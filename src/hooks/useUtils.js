import {copyText} from '../utils/copyText';

import useAlert from './useAlert';

const useUtils = () => {
    const {alertNotify} = useAlert();

    const copyTextWithNotify = (text, alertText = "Текст скопирован") => {
        copyText(text);
        alertNotify("Успешно", alertText, "success");
    }

    return {
        copyTextWithNotify
    }
}

export default useUtils;