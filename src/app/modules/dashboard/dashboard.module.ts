import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardFilterComponent } from './filter/dashboard-filter.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent, DashboardFilterComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule {}

