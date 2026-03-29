import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewWelcomeMessageComponent } from './review-welcome-message/review-welcome-message.component';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/i18n';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DateDifferencePipe } from '../user-management/time_format_pipe';
@NgModule({
  declarations: [
    ReviewWelcomeMessageComponent
  ],
  imports: [
    CommonModule,
    DateDifferencePipe,
    RouterModule.forChild([
			{
			path: '',
			component: ReviewWelcomeMessageComponent,
			},
		]),
		TranslationModule,
    NgxSpinnerModule
  ]
})
export class ReviewWelcomeMessageModule { }
