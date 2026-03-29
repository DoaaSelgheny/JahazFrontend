import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalsModule } from 'src/app/_metronic/partials';
import { TranslationModule } from 'src/app/i18n';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import { ViewDescriptionComponent } from './view-description/view-description.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryAlertComponent } from './category-alert/category-alert.component';



@NgModule({
  declarations: [CategoryManagementComponent, ViewDescriptionComponent, AddCategoryComponent, CategoryAlertComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryManagementComponent,
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
    NgbTooltipModule
  ]
})
export class CategoryManagementModule { }
