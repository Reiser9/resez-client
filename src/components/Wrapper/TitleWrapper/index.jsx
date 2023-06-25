import React from 'react';

const TitleWrpapper = ({pageTitle, children}) => {
    React.useEffect(() => {
        document.title = pageTitle || "ResEz";
        window.scrollTo(0, 0);
    }, [pageTitle]);

    return children;
}

export default TitleWrpapper;