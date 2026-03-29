import { getChangedComponent } from './components/get-changed/get-changed.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from 'src/app/i18n/translation.module';
import { OtpComponent } from './components/otp/otp.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ActivateSucComponent } from './components/activate-suc/activate-suc.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AfterRegisterationSucComponent } from './components/after-registeration-suc/after-registeration-suc.component';
import { BlockCopyPasteDirective } from 'src/app/modules/SharedComponent/block-copy-paste.directive';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { UploadFileModule } from 'src/app/modules/SharedComponent/upload-file/upload-file.module';
@NgModule({
  declarations: [
    LoginComponent,
    OtpComponent,
    ForgotPasswordComponent,
    AuthComponent,
    SetNewPasswordComponent,
    ActivateSucComponent,
    getChangedComponent,

    AfterRegisterationSucComponent,
    BlockCopyPasteDirective,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    NgxIntlTelephoneInputModule,
    UploadFileModule
  ],
  exports: [ NgxIntlTelephoneInputModule, UploadFileModule],
  providers: [],
})
export class AuthModule {}
