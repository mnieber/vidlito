import { useRoute } from 'wouter';
import { navHandler } from '/src/routes/navHandler';

export function useHasRouteMatch() {
  const allRoutePatterns = navHandler().getRoutes();
  const matchResults = allRoutePatterns.map(
    (pattern: string) => useRoute(pattern)[0]
  );
  return matchResults.some(Boolean);
}
