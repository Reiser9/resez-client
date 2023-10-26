import React from 'react';
import parse from 'html-react-parser';
import { StaticMathField } from 'react-mathquill';

const CustomHtmlParser = ({html}) => {
    return parse(html, {
        replace: (node) => {
            if(node?.type === 'tag' && node?.attribs?.class === 'mathquill'){
                if(node?.name === 'span'){
                    return(
                        <span className="mathquill">
                            <StaticMathField>{node.children[0].data}</StaticMathField>
                        </span>
                    )
                }
                else{
                    return(
                        <p className="mathquill">
                            <StaticMathField>{node.children[0].data}</StaticMathField>
                        </p>
                    )
                }
            }
        },
    });
}

export default CustomHtmlParser;