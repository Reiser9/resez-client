import React from "react";

const useTheme = () => {
    const [theme, setTheme] = React.useState("light");

    const initTheme = (themeInit) => {
        setTheme(themeInit);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(themeInit);
    }

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    };

    React.useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if(storedTheme){
            initTheme(storedTheme);
        }
    }, []);

    return {
        theme,
        changeTheme
    };
};

export default useTheme;
