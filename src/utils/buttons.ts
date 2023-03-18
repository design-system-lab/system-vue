import { RouteLocationRaw } from 'vue-router';
import { isRouterLink } from './router';

export const getButtonElement = (href: string | undefined, to: RouteLocationRaw | undefined): string => {
  if (href) return 'a';
  if (to && isRouterLink(to)) return 'router-link';

  return 'button';
}
