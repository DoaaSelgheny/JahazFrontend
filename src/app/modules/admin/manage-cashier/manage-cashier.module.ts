import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';
import {
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from 'src/app/_metronic/partials/layout/modals/modals.module';
import { TranslationModule } from 'src/app/i18n';
import { ManageCashierComponent } from './manage-cashier.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewMoreBranchesComponent } from './view-more-branches/view-more-branches.component';
import { AddCashierComponent } from './add-cashier/add-cashier.component';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ViewCashierComponent } from './view-cashier/view-cashier.component';
import { WidgetsModule, DropdownMenusModule } from 'src/app/_metronic/partials';

@NgModule({
	declarations: [ManageCashierComponent, ViewMoreBranchesComponent, AddCashierComponent, ViewCashierComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
			path: '',
			component: ManageCashierComponent,
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
		
	],
  })
export class CashiersManagementModule {}
