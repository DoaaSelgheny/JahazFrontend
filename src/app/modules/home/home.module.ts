import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TranslationModule } from 'src/app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderLayoutComponent } from './header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewVideoComponent } from './view-video/view-video.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [ViewVideoComponent,HomeComponent,HeaderLayoutComponent],
  imports: [
    CommonModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    HomeRoutingModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class HomeModule {}
