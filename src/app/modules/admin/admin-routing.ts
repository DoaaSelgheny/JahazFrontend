import { Routes } from '@angular/router';
const AdminRouting: Routes = [
  {
    path: 'requests',
    loadChildren: () =>
      import('./requests-managment/requests-managment.module').then(
        (m) => m.RequestsManagmentModule,
      ),
  },
  {
    path: 'manage-requests',
    loadChildren: () =>
      import('./manage-request/manage-requests.module').then(
        (m) => m.ManageRequestsModule,
      ),
  },

  {
    path: 'setting',
    loadChildren: () =>
      import('./settingModule/settingModule.module').then(
        (m) => m.SettingModuleModule,
      ),
  },


  {
    path: 'request-detail/:id',
    loadChildren: () =>
      import('./request-detail/request-detail.module').then(
        (m) => m.RequestDetailModule,
      ),
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule,
      ),
  },
  {
    path: 'cashier-management',
    loadChildren: () =>
      import('./manage-cashier/manage-cashier.module').then(
        (m) => m.CashiersManagementModule,
      ),
  },
  {
    path: 'brand-manager',
    loadChildren: () =>
      import('./brand-manager/brand-manager.module').then(
        (m) => m.BrandManagerModule,
      ),
  },
  {
    path: 'branches-management',
    loadChildren: () =>
      import('./branches-managment/branches-management.module').then(
        (m) => m.BranchesManagementModule,
      ),
  },
  {
    path: 'add-branch',
    loadChildren: () =>
      import('./branches-managment/add-new-branch/add-branch.module').then(
        (m) => m.AddNewBranchModule,
      ),
  },

  {
    path: 'notification-management',
    loadChildren: () =>
      import('./notification-management/notification-management.module').then(
        (m) => m.NotificationManagementModule,
      ),
  },
  {
    path: 'dashboard',

    loadChildren: () =>
      import('./dashboard-management/dashboard-management.module').then(
        (m) => m.DashboardManagementModule,
      ),
  },

  {
    path: 'manager-dashboard',
    loadChildren: () =>
      import('../manager/dashboard-management/dashboard-management.module').then(
        (m) => m.DashboardManagementModule,
      ),
  },
  {
    path: 'brands',
    loadChildren: () =>
      import('./brands/brands.module').then((m) => m.BrandsModule),
  },
  {
    path: 'dashboard-brand-manager',
    loadChildren: () =>
      import('../admin/dashboard-brand-manager/dashboard-brand-manager.module').then(
        (m) => m.DashboardBrandManagerModule,
      ),
  },
  {
    path: 'branch-manager-management',
    loadChildren: () =>
      import('./branch-manager-management/branch-manager-management.module').then(
        (m) => m.BranchManagerManagementModule,
      ),
  },
  {
    path: 'welcome-message',
    loadChildren: () =>
      import('./welcome-message/welcome-message.module').then(
        (m) => m.WelcomeMessageModule,
      ),
  },
  {
    path: 'welcome-message/:id',
    loadChildren: () =>
      import('./welcome-message/welcome-message.module').then(
        (m) => m.WelcomeMessageModule,
      ),
  },
  {
    path: 'review-welcome-message/:id',
    loadChildren: () =>
      import('./review-welcome-message/review-welcome-message.module').then(
        (m) => m.ReviewWelcomeMessageModule,
      ),
  },
  {
    path: 'welcome-message-management',
    loadChildren: () =>
      import('./welcom-message-management/welcom-message-management.module').then(
        (m) => m.WelcomMessageManagementModule,
      ),
  },
  {
    path: 'category-management',
    loadChildren: () =>
      import('./category-management/category-management.module').then(
        (m) => m.CategoryManagementModule,
      ),
  },
  {
    path: 'redeem-points-management',
    loadChildren: () =>
      import('./redeem-points-management/redeem-points.module').then(
        (m) => m.RedeemPointsModule,
      ),
  },

  {
    path: 'manage-contact-us',
    loadChildren: () =>
      import('./manage-contact-us/manage-contact-us.module').then(
        (m) => m.ManageContactUsModule,
      ),
  },
  // {
  //   path: 'smart-dashboard',
  //   loadChildren: () =>
  //     import('./smart-dashboard/smart-dashboard.module').then(
  //       (m) => m.SmartDashboardModule,
  //     ),
  // },
  {
    path: 'water-dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

export { AdminRouting };
