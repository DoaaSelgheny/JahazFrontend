import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule } from '@angular/router';
import {
  DropdownMenusModule,
  ModalsModule,
  WidgetsModule,
} from 'src/app/_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from 'src/app/i18n';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ViewUserComponent } from './view-user/view-user.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateDifferencePipe } from './time_format_pipe';
import { ViewCarHistoryComponent } from './view-car-history/view-car-history.component';
import { VisitsHistoryComponent } from './visits-history/visits-history.component';
import { RedeemPointsCashierComponent } from './redeem-points-cashier/redeem-points-cashier.component';
import { VehicleDetailsDialogComponent } from './vehicle-details-dialog/vehicle-details-dialog.component';

@NgModule({
  declarations: [UserManagementComponent,

     AddUserModalComponent, ViewUserComponent, ViewCarHistoryComponent, VisitsHistoryComponent, RedeemPointsCashierComponent,VehicleDetailsDialogComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    DateDifferencePipe,

    RouterModule.forChild([
      {
        path: '',
        component: UserManagementComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    DropdownMenusModule,
    NgbModule,
    // NgxNumToWordsModule,
    NgbDropdownModule,
    TranslationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxIntlTelephoneInputModule,
  ],
})
export class UserManagementModule {}
