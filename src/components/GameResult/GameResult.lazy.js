import React, { lazy, Suspense } from 'react';

const LazyGameResult = lazy(() => import('./GameResult'));

const GameResult = props => (
  <Suspense fallback={null}>
    <LazyGameResult {...props} />
  </Suspense>
);

export default GameResult;
