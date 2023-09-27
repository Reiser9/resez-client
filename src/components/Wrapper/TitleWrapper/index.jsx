import React from 'react';

const TitleWrapper = ({pageTitle, children}) => {
    React.useEffect(() => {
        document.title = pageTitle || "ResEz";
        window.scrollTo(0, 0);
    }, [pageTitle]);

    return children;
}

export default TitleWrapper;