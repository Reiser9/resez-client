import { Warn, News, Gift, Unknown, Vote, Added } from "../components/Icons"

export const getNotifyType = (type) => {
    switch(type){
        case "Сессия":
            return {
                icon: <Warn />,
                name: "session"
            }
        case "Информация":
            return {
                icon: <News />,
                name: "info"
            }
        case "Подарок":
            return {
                icon: <Gift />,
                name: "gift"
            }
        case "Голосование":
            return {
                icon: <Vote />,
                name: "vote"
            }
        case "Добавление":
            return {
                icon: <Added />,
                name: "added"
            }
        default:
            return {
                icon: <Unknown />,
                name: "unknown"
            }
    }
}