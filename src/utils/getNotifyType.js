import { Warn, News, Gift, Unknown } from "../components/Icons"

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
        default:
            return {
                icon: <Unknown />,
                name: "unknown"
            }
    }
}