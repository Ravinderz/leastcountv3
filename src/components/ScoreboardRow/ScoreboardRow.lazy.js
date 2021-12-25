import React, { lazy, Suspense } from 'react';

const LazyScoreboardRow = lazy(() => import('./ScoreboardRow'));

const ScoreboardRow = props => (
  <Suspense fallback={null}>
    <LazyScoreboardRow {...props} />
  </Suspense>
);

export default ScoreboardRow;
