export const getEvent = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    if ((month === 12 && day >= 1) || (month === 2 && day <= 29)) {
        return "newyear";
    }

    if ((month === 10 && day >= 27) || (month === 11 && day <= 3)) {
        return "halloween";
    }

    return "not";
};
