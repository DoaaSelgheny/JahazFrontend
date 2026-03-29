import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { CashiersService } from 'src/app/services/api/cashier.service';

@Component({
  selector: 'app-add-cashier',
  templateUrl: './add-cashier.component.html',
  styleUrls: ['./add-cashier.component.scss'],
})
export class AddCashierComponent implements OnInit {
  form: FormGroup;
  public CountryISO: any;
  public PhoneNumberFormat: any;
  public SearchCountryField: any;
  dropdownSettingBranch = {};
  dropdownSettings = {};
  dropdownSettingNationality = {};
  brands: any;
  branchs: any;
  nationality: any;
  lang: string = String(localStorage.getItem('language'));
  name = this.lang === 'ar' ? 'nameAr' : 'nameEn';

  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private brandService: BrandService,
    private modalService: NgbModal,
    private branchService: BranchesService,
    private cashierService: CashiersService
  ) {
    this.CountryISO = CountryISO;
    this.PhoneNumberFormat = PhoneNumberFormat;
    this.SearchCountryField = SearchCountryField;
  }

  ngOnInit(): void {
    this.addBrandForm();
    this.initDropDownList();
    this.getBrands();
    this.getNationality();
  }
  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettingBranch = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettingNationality = {
      singleSelection: true,
      idField: 'id',
      textField: this.name,
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  getBrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  getNationality() {
    this.cashierService.getNationality().subscribe((res) => {
      this.nationality = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  addBrandForm() {
    this.form = this.formbuilder.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      nationalityId: [null, [Validators.required]],
      countryCode: [966],
      countryCodeIso: ['SA'],
      phoneNumber: [null, [Validators.required]],
      branches: [null, [Validators.required]],
      brand: [null, [Validators.required]],
    });
  }
  onItemSelect(item: any) {
    this.form.controls.branches.setValue(null);
    this.cashierService.getBranchByBrand(item.id).subscribe({
      next: (next) => {
        this.branchs = next;
        this.cdr.detectChanges();
      },
    });
  }
  onItemSelectNational(item: any) {
    if (item) {
      this.form.get('nationalityId')?.setValue(item.id);
    } else {
      this.form.get('nationalityId')?.markAsTouched({ onlySelf: true });
      this.form.get('nationalityId')?.setErrors({ required: true });
    }
  }

  public onInputChange(event: any) {
    if (event.isNumberValid) {
      this.form
        .get('phoneNumber')
        ?.setValue(
          event.phoneNumber.replace(/\s/g, '').split('+' + event.dialCode)[1]
        );
      this.form.get('countryCode')?.setValue(event.dialCode);
      this.form.get('countryCodeIso')?.setValue(event.iso2Code);
    } else {
      this.form.get('phoneNumber')?.markAsTouched({ onlySelf: true });
      this.form.get('phoneNumber')?.setErrors({ required: true });
    }
  }
  public submit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((field) => {
        // {1}
        const control = this.form.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    if (this.form.valid) {
      this.form.value.branches.forEach((element: any, index: any) => {
        element.branchId = element?.id;
        if (index === 0) {
          element.isActive = true;
        } else {
          element.isActive = false;
        }
      });

      this.spinner.show();
      this.cashierService
        .addCashier(this.form.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('users.addSuccess'));
            this.modalService.dismissAll('Cross click');
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
          },
        });
    }
  }

  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
