import React, { lazy, Suspense } from 'react';

const LazyScoreboardHeader = lazy(() => import('./ScoreboardHeader'));

const ScoreboardHeader = props => (
  <Suspense fallback={null}>
    <LazyScoreboardHeader {...props} />
  </Suspense>
);

export default ScoreboardHeader;
