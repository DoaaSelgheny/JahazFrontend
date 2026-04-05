import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

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




