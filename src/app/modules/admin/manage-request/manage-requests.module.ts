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
import { ManageRequestComponent } from './manage-request.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateDifferencePipe } from '../user-management/time_format_pipe';
import { VehicleDetailsDialogComponent } from './vehicle-details-dialog/vehicle-details-dialog.component';
import { TruckImagesComponent } from './truck-images/truck-images.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [ManageRequestComponent, VehicleDetailsDialogComponent, TruckImagesComponent,],
  imports: [
    CommonModule,
    InlineSVGModule,
    DateDifferencePipe,
        NgApexchartsModule   ,
    RouterModule.forChild([
      {
        path: '',
        component: ManageRequestComponent,
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
export class ManageRequestsModule {}
