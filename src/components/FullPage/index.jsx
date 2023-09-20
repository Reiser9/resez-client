import React from 'react';
import parse from 'html-react-parser';

import fullpage from '../../styles/fullpage.module.css';
import typography from '../../styles/typography.module.css';

const FullPage = ({
    icon,
    code,
    text,
    children
}) => {
    return (
        <div className={fullpage.fullPage}>
            <div className={fullpage.fullPageContent}>
                <div className={fullpage.fullPageImg}>
                    {icon}
                </div>

                {code && <h2 className={fullpage.fullPageTitle}>{parse(code)}</h2>}

                {text && <p className={`${typography.h4} ${fullpage.fullPageText}`}>
                    {text}
                </p>}

                {children}
            </div>
        </div>
    )
}

export default FullPage;