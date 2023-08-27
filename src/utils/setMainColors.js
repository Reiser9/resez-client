import { CONFIG } from "../consts/CONFIG";

export const setMainColors = (primary, light) => {
    document.documentElement.style.setProperty('--main', primary ? primary : CONFIG.BASE_COLOR);
    document.documentElement.style.setProperty('--lighten', light ? light : CONFIG.BASE_COLOR_LIGHT);
}