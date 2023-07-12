export const setMainColors = (primary, light) => {
    document.documentElement.style.setProperty('--main', primary ? primary : '#007cee');
    document.documentElement.style.setProperty('--lighten', light ? light : '#007cee10');
}