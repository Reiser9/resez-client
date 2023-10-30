import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import useTest from '../../../../hooks/useTest';

import ScrollWithArrows from '../../../../components/ScrollWithArrows';
import ScrollSkeleton from '../../../../components/Skeleton/Scroll';

const Recommended = () => {
    const [subjectsIsLoading, setSubjectsIsLoading] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    const {getShortSubjects} = useTest();

    const {subject} = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        setSubjectsIsLoading(true);
        getShortSubjects().then(subjects => {
            setSubjectsIsLoading(false);
            if(!subjects){
                return;
            }

            setSubjects(subjects);
        });
    }, []);

    React.useEffect(() => {
        if(!subject && subjects?.length > 0){
            navigate(`/tests/recommended/${subjects[0].id}`, {replace: true});
        }
    }, [subject, subjects]);

    return (
        <div className={base.baseWrapperGap16}>
            {subjectsIsLoading
            ? <ScrollSkeleton />
            : subjects?.length > 0 && <ScrollWithArrows>
                {subjects?.map(data => <Link key={data.id} to={`/tests/recommended/${data.id}`} replace className={`${base.tag}${subject == data.id ? ` ${base.active}` : ""}`}>{data.subject}</Link>)}
            </ScrollWithArrows>}

        </div>
    )
}

export default Recommended;