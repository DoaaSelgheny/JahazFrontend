import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchManagerManagementComponent } from './branch-manager-management/branch-manager-management.component';
import { RouterModule } from '@angular/router';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import { NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { TranslationModule } from 'src/app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewBrachManagerComponent } from './view-brach-manager/view-brach-manager.component';
import { AddBranchManagerComponent } from './add-branch-manager/add-branch-manager.component';



@NgModule({
  declarations: [
    BranchManagerManagementComponent,
    ViewBrachManagerComponent,
    AddBranchManagerComponent
  ],
  imports: [
  CommonModule,
    RouterModule.forChild([
			{
			path: '',
			component: BranchManagerManagementComponent,
			},
		]),
		UploadFileModule,
		NgbPaginationModule,
		NgxIntlTelephoneInputModule,
		TranslationModule,
		ReactiveFormsModule,
		FormsModule,
		ModalsModule,
		NgbDropdownModule,
		NgMultiSelectDropDownModule.forRoot(),
		WidgetsModule,
		DropdownMenusModule,
		NgbModule,
  ]
})
export class BranchManagerManagementModule { }
