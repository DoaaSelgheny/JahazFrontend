import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageChangeComponent } from './SharedComponent/language-change';
import { ConfirmationDialogComponent } from './SharedComponent/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { TranslationModule } from 'src/app/i18n';
// import { Conf}
@NgModule({
  declarations: [LanguageChangeComponent],
  imports: [CommonModule, LanguageChangeComponent,TranslationModule],
  exports:[LanguageChangeComponent],
  providers: [ConfirmationDialogService]
})
export class SharedModule {}
