import { RouteLocationRaw } from 'vue-router';
import { isObjEmpty } from './objects';

// determines whether a value is a router link
export const isRouterLink = (p: RouteLocationRaw): boolean => {
  if (p && typeof p !== 'string') return isObjEmpty(p);
  return !!p;
}