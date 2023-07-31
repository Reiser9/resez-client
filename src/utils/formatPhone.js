// phoneNumber = +7(999) 999 99-99 => +79999999999
export const unmaskPhone = (phoneNumber) => {
    if(!phoneNumber){
        return phoneNumber;
    }

    return phoneNumber.replace(/[^\d+]/g, '');
}

// phoneNumber = +79999999999 => +7(999) 999 99-99
export const maskPhone = (phoneNumber) => {
    if(!phoneNumber || phoneNumber.length < 12){
        return phoneNumber;
    }

    const countryCode = phoneNumber.slice(0, 2);
    const regionCode = phoneNumber.slice(2, 5);
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 10);
    const thirdPart = phoneNumber.slice(10, 12);
    
    return `${countryCode}(${regionCode}) ${firstPart} ${secondPart}-${thirdPart}`;
}

export const cleanPhoneNumber = (phoneNumber) => {
    let cleanedNumber = phoneNumber.replace(/\D/g, "");
    cleanedNumber = cleanedNumber.replace(/^7/, "");
  
    if(cleanedNumber.length > 10) {
        cleanedNumber = cleanedNumber.slice(0, 10);
    }
  
    return cleanedNumber;
};