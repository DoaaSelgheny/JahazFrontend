import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/i18n';
import { RedeemPointsManagementComponent } from './redeem-points-management.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalsModule } from 'src/app/_metronic/partials';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import { AddRedeemPointsComponent } from './add-redeem-points/add-redeem-points.component';

@NgModule({
  declarations: [RedeemPointsManagementComponent, AddRedeemPointsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RedeemPointsManagementComponent,
      },
    ]),
    TranslationModule,
    UploadFileModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    ModalsModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class RedeemPointsModule {}
