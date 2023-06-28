export const convertHexToOpacityHex = (hexColor, opacity = "0.1") => {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexColor)) {
        return;
    }
  
    return `${hexColor}${opacity.split(".")[1]}0`;
}