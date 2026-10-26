import { Routes } from '@angular/router';

const SITE_TITLE = 'Yoseph Getachew';

/**
 * Route map — PUBLIC and ADMIN are clearly separated.
 *
 * PUBLIC : rendered inside PublicLayout (top header + footer, no auth).
 * ADMIN  : rendered inside AdminShell (CMS navigation of its own).
 * Legacy URLs redirect to the clean ones, so old links keep working.
 */
export const routes: Routes = [
  // ---------------------------------------------------------------- PUBLIC
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        title: `${SITE_TITLE} — Software Engineer`,
        loadComponent: () => import('./components/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        title: `About — ${SITE_TITLE}`,
        loadComponent: () => import('./components/about/about').then((m) => m.About),
      },
      {
        path: 'skills',
        title: `Skills — ${SITE_TITLE}`,
        loadComponent: () => import('./components/skills/skills').then((m) => m.Skills),
      },
      {
        path: 'education',
        title: `Education — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/educationalbackground/educationalbackground').then(
            (m) => m.Educationalbackground,
          ),
      },
      {
        path: 'experience',
        title: `Experience — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/experiance/experiance').then((m) => m.Experiance),
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            title: `Projects — ${SITE_TITLE}`,
            loadComponent: () =>
              import('./components/projects/projects').then((m) => m.Projects),
          },
          {
            path: ':slug',
            title: `Project Case Study — ${SITE_TITLE}`,
            loadComponent: () =>
              import('./components/projects/project-detail/project-detail').then(
                (m) => m.ProjectDetail,
              ),
          },
        ],
      },
      {
        path: 'contact',
        title: `Contact — ${SITE_TITLE}`,
        loadComponent: () => import('./components/contacts/contacts').then((m) => m.Contacts),
      },
      {
        path: 'hero',
        title: `Hero — ${SITE_TITLE}`,
        loadComponent: () => import('./components/hero/hero').then((m) => m.Hero),
      },
    ],
  },

  // ------------------------------------------- LEGACY REDIRECTS (old URLs)
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'protofolio', redirectTo: '', pathMatch: 'full' },
  { path: 'protofolio/about', redirectTo: 'about', pathMatch: 'full' },
  { path: 'protofolio/skills', redirectTo: 'skills', pathMatch: 'full' },
  { path: 'protofolio/projects', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'protofolio/experiance', redirectTo: 'experience', pathMatch: 'full' },
  { path: 'protofolio/contacts', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'protofolio/educationalbackground', redirectTo: 'education', pathMatch: 'full' },
  { path: 'protofolio/hero', redirectTo: '', pathMatch: 'full' },
  { path: 'experiance', redirectTo: 'experience', pathMatch: 'full' },
  { path: 'contacts', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'educationalbackground', redirectTo: 'education', pathMatch: 'full' },

  // ---------------------------------------------------------------- ADMIN
  {
    path: 'admin',
    title: `Admin — ${SITE_TITLE}`,
    loadComponent: () =>
      import('./components/admin/admin-shell/admin-shell').then((m) => m.AdminShell),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: `Admin Dashboard — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/dashboard/dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'about',
        title: `Admin About Me — ${SITE_TITLE}`,
        loadComponent: () => import('./components/admin/about/about').then((m) => m.AdminAbout),
      },
      {
        path: 'experience',
        title: `Admin Experience — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/experience/experience').then((m) => m.AdminExperience),
      },
      {
        path: 'projects',
        title: `Admin Projects — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/projects/projects').then((m) => m.AdminProjects),
      },
      {
        path: 'education',
        title: `Admin Education — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/education/education').then((m) => m.AdminEducation),
      },
      {
        path: 'contact',
        title: `Admin Contact — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/contact/contact').then((m) => m.AdminContact),
      },
      {
        path: 'images',
        title: `Admin Images — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/images/images').then((m) => m.AdminImages),
      },
      {
        path: 'messages',
        title: `Admin Messages — ${SITE_TITLE}`,
        loadComponent: () =>
          import('./components/admin/messages/messages').then((m) => m.AdminMessages),
      },
    ],
  },

  {
    path: '**',
    title: `Page not found — ${SITE_TITLE}`,
    loadComponent: () => import('./compponents/notfound/notfound').then((n) => n.Notfound),
  },
];
