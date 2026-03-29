import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationManagmentComponent } from './notification-managment/notification-managment.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'src/app/_metronic/partials';
import {
  NgbDatepickerModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from 'src/app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotificationManagmentComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotificationManagmentComponent,
      },
    ]),
    WidgetsModule,
    NgbPaginationModule,
    TranslationModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class NotificationManagementModule {}
