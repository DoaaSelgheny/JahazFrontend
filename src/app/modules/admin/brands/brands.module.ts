import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from 'src/app/i18n';
import { FoodicsDetailsComponent } from './brands/foodics-details/foodics-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BrandsComponent,
    FoodicsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BrandsComponent,
      },
    ]),
    NgbPaginationModule,
    TranslationModule,
    NgbDropdownModule,
    NgbModalModule,
    FormsModule,
  ]
})
export class BrandsModule { }
