import React, { lazy, Suspense } from 'react';

const LazyGameinfo = lazy(() => import('./Gameinfo'));

const Gameinfo = props => (
  <Suspense fallback={null}>
    <LazyGameinfo {...props} />
  </Suspense>
);

export default Gameinfo;
