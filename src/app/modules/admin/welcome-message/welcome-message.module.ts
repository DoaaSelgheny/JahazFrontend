import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWelcomeMessageComponent } from './add-welcome-message/add-welcome-message.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ModalsModule, WidgetsModule, DropdownMenusModule } from 'src/app/_metronic/partials';
import { TranslationModule } from 'src/app/i18n';
import { UploadFileModule } from '../../SharedComponent/upload-file/upload-file.module';



@NgModule({
  declarations: [
    AddWelcomeMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
			{
			path: '',
			component: AddWelcomeMessageComponent,
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
export class WelcomeMessageModule { }
