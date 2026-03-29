import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/i18n';
import { RequestDetailComponent } from './request-detail.component';

@NgModule({
  declarations: [RequestDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestDetailComponent,
      },
    ]),
    TranslationModule,
  ],
})
export class RequestDetailModule {}
