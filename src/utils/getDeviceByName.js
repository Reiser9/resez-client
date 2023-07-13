import { Desktop, Mobile, Tablet, Tv, Unknown } from "../components/Icons"

export const getDeviceByName = (name) => {
    switch(name){
        case "desktop":
            return {
                icon: <Desktop />,
                name: "Компьютер"
            }
        case "phone":
            return {
                icon: <Mobile />,
                name: "Телефон"
            }
        case "tablet":
            return {
                icon: <Tablet />,
                name: "Планшет"
            }
        case "tv":
            return {
                icon: <Tv />,
                name: "Телевизор"
            }
        default:
            return {
                icon: <Unknown />,
                name: "Неизвестный"
            }
    }
}