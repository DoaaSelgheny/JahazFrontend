import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMessageManagementComponent } from './welcome-message-management/welcome-message-management.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ModalsModule, WidgetsModule, DropdownMenusModule } from 'src/app/_metronic/partials';
import { TranslationModule } from 'src/app/i18n';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';



@NgModule({
  declarations: [
    WelcomeMessageManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
			{
			path: '',
			component: WelcomeMessageManagementComponent,
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
export class WelcomMessageManagementModule { }
