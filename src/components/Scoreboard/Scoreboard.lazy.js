import React, { lazy, Suspense } from 'react';

const LazyScoreboard = lazy(() => import('./Scoreboard'));

const Scoreboard = props => (
  <Suspense fallback={null}>
    <LazyScoreboard {...props} />
  </Suspense>
);

export default Scoreboard;
