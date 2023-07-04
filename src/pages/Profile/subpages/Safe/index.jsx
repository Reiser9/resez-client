import React from 'react';
import {Routes, Route} from 'react-router-dom';

import { withSuspense } from '../../../../hoc/withSuspense';

const SafeMain = React.lazy(() => import("./SafeMain"));
const Sessions = React.lazy(() => import("./Sessions"));

const Safe = () => {
    return (
        <Routes>
            <Route index element={withSuspense(SafeMain)} />
            <Route path="/sessions" element={withSuspense(Sessions)} />
        </Routes>
    )
}

export default Safe;