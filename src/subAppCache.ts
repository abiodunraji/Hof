import type { ComponentType } from 'react';

/**
 * Populated by src/main.tsx before the first render: it awaits the dynamic
 * import of the current route's sub-app module and stores the already
 * resolved component here. src/App.tsx reads this cache first and only
 * falls back to its React.lazy()-wrapped component when nothing is cached
 * yet (later client-side navigations).
 *
 * This exists because calling React.lazy()'s loader yourself ahead of time
 * does not make lazy's own first render synchronous — React.lazy still runs
 * its own .then() and suspends once. Reading an already-resolved component
 * from this cache lets the first client render match the server-rendered
 * (prerendered) markup exactly, with no Suspense fallback in between.
 */
export const subAppCache: {
  InteriorsApp?: ComponentType;
  ConstructionApp?: ComponentType;
} = {};
