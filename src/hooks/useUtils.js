import {copyText} from '../utils/copyText';

import useAlert from './useAlert';

const useUtils = () => {
    const {alertNotify} = useAlert();

    const copyTextWithNotify = (text) => {
        copyText(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    return {
        copyTextWithNotify
    }
}

export default useUtils;