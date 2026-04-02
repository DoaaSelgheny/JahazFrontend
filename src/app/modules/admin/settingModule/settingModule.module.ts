import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingModuleComponent } from './settingModule.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
        RouterModule.forChild([
          {
            path: '',
            component: SettingModuleComponent,
          },
        ]),
  ],
  declarations: [SettingModuleComponent]
})
export class SettingModuleModule { }
