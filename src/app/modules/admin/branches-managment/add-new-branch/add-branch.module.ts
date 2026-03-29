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
import { AddNewBranchComponent } from './add-new-branch.component';
import { AddCameraComponent } from './add-camera/add-camera.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [AddNewBranchComponent, AddCameraComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddNewBranchComponent,
      },
    ]),
    NgMultiSelectDropDownModule.forRoot(),
    NgbPaginationModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    ModalsModule,
    NgbDropdownModule,
    // NgbCarouselModule,
  ],
})
export class AddNewBranchModule {}
