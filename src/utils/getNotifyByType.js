import styles from '../components/Notifies/index.module.css';

import { Warn, Error, Success, Info } from '../components/Icons';

export const getNotifyByType = (type) => {
    switch(type){
        case "success":
            return {
                icon: <Success />,
                class: styles.success
            }
        case "info":
            return {
                icon: <Info />,
                class: styles.info
            }
        case "warn":
            return {
                icon: <Warn />,
                class: styles.warn
            }
        case "error":
            return {
                icon: <Error />,
                class: styles.error
            }
        default:
            return {
                icon: <Success />,
                class: styles.success
            }
    }
}