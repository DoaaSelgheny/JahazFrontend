import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/api/brand.service';
import { IntegrationWay } from 'src/app/services/enums/IntegrationWay.enum';

@Component({
  selector: 'app-foodics-details',
  templateUrl: './foodics-details.component.html',
  styleUrls: ['./foodics-details.component.scss']
})
export class FoodicsDetailsComponent implements OnInit {
  @Input() id:any
  @Input() type:string
  @Input() foodicsData:string
  @Input() state:string
  @Input() integrationWay: number | null = null;

  foodics:string |null=null
selectedIntegration: IntegrationWay | null = null;
  IntegrationWay = IntegrationWay;
@Input() syrveUsername: string ;
@Input() syrvePassword: string ;
syrveLocationNumber: string = '';
currentLangDirection = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private brandService: BrandService,
    private toastr: ToastrService,
    private translate: TranslateService,

  ) {

  }

  ngOnInit(): void {
    // console.log('old'+this.syrveUsername + ' ---' + this.syrvePassword );
    // console.log('new'+this.syrveUsername + ' ---' + this.syrvePassword);

    if(this.foodics){
      this.foodics = this.foodicsData;
    }

      if (this.integrationWay === IntegrationWay.Foodics || this.integrationWay === IntegrationWay.Syrve) {
    this.selectedIntegration = this.integrationWay;
  } else {
    this.selectedIntegration = null;
  }

  }
  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
  // submit(){
  //     if (!this.selectedIntegration) {
  //   this.toastr.warning(this.translate.instant('brands.selectSystemRequired'));
  //   return;
  // }
  //   this.spinner.show()
  //   let data={
  //     id: this.id,
  //     accessToken: this.foodics,
  //       host: this.syrveUsername,
  // password: this.syrvePassword,
  //     IntegrationWay:this.selectedIntegration
  //   }
  //   // if(this.foodics){
  //     this.brandService.setBrandAccessToken(data).subscribe({
  //       next:next=>{
  //         this.spinner.hide();
  //         this.toastr.success(this.translate.instant('brands.addSuccess'));
  //         this.activeModal.close();
  //       },
  //       error: (err) => {
  //         this.spinner.hide();
  //         this.toastr.error(err.error.error.message);
  //       },
  //     })
  //   // }
  // }

  submit() {
  console.log(this.selectedIntegration);

  if (this.selectedIntegration==null) {
    this.toastr.warning(this.translate.instant('brands.selectSystemRequired'));
    return;
  }
  this.spinner.show();

  let data: any = {
    id: this.id,
    IntegrationWay: this.selectedIntegration
  };

  if (Number(this.selectedIntegration) === IntegrationWay.Foodics) {
    if (!this.foodics?.trim()) {
      this.spinner.hide();
      this.toastr.warning(this.translate.instant('brands.accessTokenRequired'));
      return;
    }
    data.accessToken = this.foodics;
  }

  if (Number(this.selectedIntegration) === IntegrationWay.Syrve) {
    if (!this.syrveUsername?.trim() || !this.syrvePassword?.trim()) {
      this.spinner.hide();
      this.toastr.warning(this.translate.instant('brands.credentialsRequired'));
      return;
    }
    data.host = this.syrveUsername;
    data.password = this.syrvePassword;
  }

  this.brandService.setBrandAccessToken(data).subscribe({
    next: () => {
      this.spinner.hide();
      this.toastr.success(this.translate.instant('brands.addSuccess'));
      this.activeModal.close();
    },
    error: (err) => {
      this.spinner.hide();
      this.toastr.error(err.error?.error?.message || this.translate.instant('error.unexpected'));
    },
  });
}

onIntegrationChange(value: IntegrationWay) {
  this.selectedIntegration = value;
}
compareIntegrationWays = (a: any, b: any): boolean => a === b;
showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


removeReadonly(event: Event): void {
  (event.target as HTMLInputElement).readOnly = false;
}
}
