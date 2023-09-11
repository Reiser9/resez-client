export const speakText = (text, rate = 2, pitch = 1) => {
    if('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const newSpeech = new SpeechSynthesisUtterance(text);
        newSpeech.rate = rate;
        newSpeech.pitch = pitch;
        speechSynthesis.speak(newSpeech);
    }
    else{
        alert("Ваш браузер не поддерживает прослушивание текста");
    }
}

export const speakIsSupport = () => {
    if('speechSynthesis' in window) {
        return true;
    }

    return false;
}