import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from 'src/app/i18n';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslationModule,

        RouterModule.forChild([
          {
            path: '',
            component: SettingComponent,
          },
        ]),
  ],
  declarations: [SettingComponent]
})
export class SettingModuleModule { }




