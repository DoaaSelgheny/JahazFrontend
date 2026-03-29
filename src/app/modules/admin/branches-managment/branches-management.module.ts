import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from 'src/app/_metronic/partials/layout/modals/modals.module';
import { BranchesMangmentComponent } from './branches-mangment/branches-mangment.component';
import { TranslationModule } from 'src/app/i18n';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewCameraComponent } from './view-camera/view-camera.component';

@NgModule({
  declarations: [BranchesMangmentComponent, ViewCameraComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BranchesMangmentComponent,
      },
    ]),
    UploadFileModule,
    NgbPaginationModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    ModalsModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    // NgbCarouselModule,
  ],
})
export class BranchesManagementModule {}
