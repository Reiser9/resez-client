import styles from '../components/LogItem/index.module.css';

import { Block, Enter, Planet, Reload, Unknown } from "../components/Icons"

export const getLogTypeByType = (type) => {
    switch(type){
        case "Регистрация":
        case "Вход":
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
        case "Восстановление пароля":
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
        default:
            return {
                icon: <Unknown />,
                class: styles.error
            }
    }
}