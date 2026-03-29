import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardManagementComponent } from './dashboard-management.component';
import { RouterModule } from '@angular/router';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';

import { TranslationModule } from 'src/app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { DateDifferencePipe } from '../user-management/time_format_pipe';

@NgModule({
  declarations: [DashboardManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardManagementComponent,
      },
    ]),
    DateDifferencePipe,
    UploadFileModule,
    NgbPaginationModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    WidgetsModule,
    ModalsModule,
    NgbDropdownModule,
    NgbCarouselModule,
  ],
})
export class DashboardManagementModule {}
