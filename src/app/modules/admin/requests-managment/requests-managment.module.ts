import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DropdownMenusModule,
  ModalsModule,
  WidgetsModule,
} from 'src/app/_metronic/partials';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from 'src/app/i18n';
import { RequestsManagmentComponent } from './requests-managment.component';

@NgModule({
  declarations: [RequestsManagmentComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestsManagmentComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    DropdownMenusModule,
    NgbModule,
    NgbDropdownModule,
    TranslationModule,
  ],
  exports: [NgbDropdownModule, DropdownMenusModule],
})
export class RequestsManagmentModule {}
