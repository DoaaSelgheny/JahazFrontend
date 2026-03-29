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
import { SmartDashboardComponent } from './smart-dashboard.component';
import { FirstTabComponent } from './first-tab/first-tab.component';
import { SecondTabComponent } from './second-tab/second-tab.component';
import { ThirdTabComponent } from './third-tab/third-tab.component';
import {  NgChartsModule } from 'ng2-charts';
import { UserInfoComponent } from './second-tab/user-info/user-info.component';
import { FilterComponent } from './filter/filter.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [SmartDashboardComponent, FirstTabComponent, SecondTabComponent, ThirdTabComponent, UserInfoComponent, FilterComponent],
  imports: [
    CommonModule,
    InlineSVGModule,

    RouterModule.forChild([
      {
        path: '',
        component: SmartDashboardComponent,
      },
    ]),
    NgMultiSelectDropDownModule.forRoot(),
    WidgetsModule,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    DropdownMenusModule,
    NgbModule,
    NgbDropdownModule,
    TranslationModule,
    NgChartsModule
  ],
  exports: [NgbDropdownModule, DropdownMenusModule],
})
export class SmartDashboardModule {}
