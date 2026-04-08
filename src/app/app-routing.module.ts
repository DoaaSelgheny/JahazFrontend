import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },

  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./modules/home/home.module').then((m) => m.HomeModule),
  // },
  {
    path: 'welcome/:id',
    loadChildren: () =>
      import('./modules/admin/review-welcome-message/review-welcome-message.module').then(
        (m) => m.ReviewWelcomeMessageModule,
      ),
  },
  {
    path: 'auth',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },

  {
    path: 'error',
    loadChildren: () =>
      import('./modules/SharedComponent/errors/errors.module').then(
        (m) => m.ErrorsModule,
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
