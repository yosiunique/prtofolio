import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Dynamic case-study page (:slug) — rendered per request instead of
    // prerendered, because the slug list changes with the CMS content.
    path: 'projects/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
