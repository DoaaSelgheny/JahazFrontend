import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-telephone-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, first } from 'rxjs';
import { ValidationPattern } from 'src/app/modules/SharedComponent/helper/validator';
import { BrandService } from 'src/app/services/api/brand.service';
import { CategoryService } from 'src/app/services/api/category.service';
import { ManageNotificationsService } from 'src/app/services/api/manage-notifications.service';
import { OrderManagementService } from 'src/app/services/api/user-management.service';
import { CategoryAlertComponent } from '../category-alert/category-alert.component';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  userModalForm: FormGroup;
  isEdit: boolean=false;
  isdisabledEdit: boolean;
  brands: any;
  @Input() id: string='';
  @Input() data: any;

  @Input() totalCount: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  minPoints:number = 0
  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private brandservice:BrandService,
    private _categoryService: CategoryService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    
    this.adduserForm();
    this.getBrands();
    if(this.id !==''){
      this.isEdit = true
      console.group(this.data)

      this.userModalForm.patchValue({
        brandId: this.data.brandId,
        name: this.data.name,
        minPoints: this.data.minPoints,
        maxPoints: this.data.maxPoints,
        totalPoints: this.data.totalPoints,
        totalPrice: this.data.totalPrice,
        description: this.data.description,
      })
      this.userModalForm.get('brandId')?.disable()
      this.userModalForm.get('maxPoints')?.disable()

    }else{

      this.isEdit = false
    }
  }
  getMinPoints(id:any){
    this._categoryService.getMinByBrandId(id).subscribe({
      next:next=>{
        this.minPoints = next.maxPoint + 1;
        this.userModalForm.patchValue({
          minPoints:this.minPoints
        })
      }
    })
  }
  getBrands() {
    this.brandservice.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  adduserForm() {
    this.userModalForm = this.formbuilder.group({
      brandId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      minPoints: [this.minPoints,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      maxPoints: [null, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      totalPoints: [null, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)(\.\d+)?$/),Validators.max(0.5) ]],
      totalPrice: [1, [Validators.required]],
      description: [null, [Validators.required]],

    });
  }

  public submit() {
    if (this.userModalForm.invalid) {
      Object.keys(this.userModalForm.controls).forEach((field) => {
        // {1}
        const control = this.userModalForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    if (this.userModalForm.valid) {
      this.spinner.show();
      if(this.isEdit){
        let data = {
          id:this.id,
          name: this.userModalForm.value.name,
          totalPoints:  this.userModalForm.value.totalPoints,
          totalPrice: this.userModalForm.value.totalPrice,
          description: this.userModalForm.value.description,
        }
        this._categoryService
        .editCategory(data)
        .pipe(first())
        .subscribe({
          next: (val:any) => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('users.addSuccess'));
            this.modalService.dismissAll('Cross click');
            this.alert(val?.value);
            
            this.passEntry.emit(true);
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
          },
        });
      }else{

        this._categoryService
          .addCategory(this.userModalForm.value)
          .pipe(first())
          .subscribe({
            next: (val) => {
              this.spinner.hide();
              this.toastr.success(this.translate.instant('users.addSuccess'));


              this.modalService.dismissAll('Cross click');
              this.alert(val);

              this.passEntry.emit(true);
            },
            error: (err) => {
              this.spinner.hide();
              this.toastr.error(err.error.error.code);
            },
          });
      }
    }
  }
  specialFunction()
  {
    this.toastr.error(this.translate.instant('Validation.maxOfCategory'));
    
  }

  alert(val:any) {

    const modalRef = this.modalService.open(CategoryAlertComponent
      , {
      size: 'sm',
      backdrop: 'static',
      centered: true,

    });
    modalRef.componentInstance.val = val;

  }
  closeModal() {
    this.passEntry.emit(false);
    this.modalService.dismissAll('Cross click');
  }
}
