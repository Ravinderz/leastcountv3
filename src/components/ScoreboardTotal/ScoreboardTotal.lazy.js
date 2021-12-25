import React, { lazy, Suspense } from 'react';

const LazyScoreboardTotal = lazy(() => import('./ScoreboardTotal'));

const ScoreboardTotal = props => (
  <Suspense fallback={null}>
    <LazyScoreboardTotal {...props} />
  </Suspense>
);

export default ScoreboardTotal;
