import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from 'src/app/_metronic/partials/layout/modals/modals.module';
import { TranslationModule } from 'src/app/i18n';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrandManagerComponent } from './brand-manager.component';
import { AddBrandManagerComponent } from './add-brand-manager/add-brand-manager.component';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ViewBrandManagerComponent } from './view-brand-manager/view-brand-manager.component';

@NgModule({
  declarations: [BrandManagerComponent,AddBrandComponent, AddBrandManagerComponent, ViewBrandManagerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BrandManagerComponent,
      },
    ]),
    NgMultiSelectDropDownModule.forRoot(),
    NgbPaginationModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    ModalsModule,
  
		NgxIntlTelephoneInputModule,
    NgbDropdownModule,
    // NgbCarouselModule,
  ],
})
export class BrandManagerModule {}
