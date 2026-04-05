import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [Dashboard],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgApexchartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Dashboard,
      },
    ]),
  ],
})
export class DashboardModule {}

