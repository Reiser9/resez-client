import styles from '../components/LogItem/index.module.css';

import { Block, Crown, Enter, Notify, Planet, Reload, Unknown } from "../components/Icons"

export const getLogTypeByType = (type) => {
    switch(type){
        case "Регистрация":
        case "Вход с нового устройства":
            return {
                icon: <Enter />,
                class: styles.success
            }
        case "Сессии":
            return {
                icon: <Planet />,
                class: styles.info
            }
        case "Смена пароля":
            return {
                icon: <Reload />,
                class: styles.warn
            }
        case "Блокировка":
        case "Разблокировка":
            return {
                icon: <Block />,
                class: styles.error
            }
        case "Уведомления":
            return {
                icon: <Notify />,
                class: styles.info
            }
        case "Роли":
            return {
                icon: <Crown />,
                class: styles.info
            }
        default:
            return {
                icon: <Unknown />,
                class: styles.error
            }
    }
}