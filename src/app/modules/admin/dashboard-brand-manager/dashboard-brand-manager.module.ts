import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBrandManagerComponent } from './dashboard-brand-manager/dashboard-brand-manager.component';
import { RouterModule } from '@angular/router';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import { NgbCarouselModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from 'src/app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { DateDifferencePipe } from '../user-management/time_format_pipe';



@NgModule({
  declarations: [
    DashboardBrandManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardBrandManagerComponent,
      },
    ]),
    UploadFileModule,
    NgbPaginationModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    WidgetsModule,
    ModalsModule,
    NgbDropdownModule,
    NgbCarouselModule,
    DateDifferencePipe,
  ]
})
export class DashboardBrandManagerModule { }
