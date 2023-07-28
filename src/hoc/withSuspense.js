import React from 'react';

import Preloader from '../components/Preloader';

export const withSuspense = (component) => {
    return(
        <React.Suspense fallback={<Preloader page />}>
            {component}
        </React.Suspense>
    );
}