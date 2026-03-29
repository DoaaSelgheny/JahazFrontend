import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BrandService } from 'src/app/services/api/brand.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { ManageBranchDirectorService } from 'src/app/services/api/manage-branch-director';
@Component({
  selector: 'app-add-brand-manager',
  templateUrl: './add-brand-manager.component.html',
  styleUrls: ['./add-brand-manager.component.scss'],
})
export class AddBrandManagerComponent implements OnInit {
  form: FormGroup;
  public CountryISO: any;
  public PhoneNumberFormat: any;
  public SearchCountryField: any;

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
    private manageBranchDirectorService: ManageBranchDirectorService
  ) {
    this.CountryISO = CountryISO;
    this.PhoneNumberFormat = PhoneNumberFormat;
    this.SearchCountryField = SearchCountryField;
  }

  ngOnInit(): void {
    this.addBrandForm();
    this.initDropDownList();
    this.getBrands();
  }
  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
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
  addNewBrand() {
    const modalRef = this.modalService.open(AddBrandComponent, {
      size: 'md',
      backdrop: 'static',
    });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      if (receivedEntry !== false) {
        this.getBrands();
        //Doaa  this.selectedItems = [receivedEntry];
        if (this.form.get('brands')?.value) {
          this.form
            .get('brands')
            ?.setValue([...this.form.get('brands')?.value, receivedEntry]);
        } else {
          this.form.get('brands')?.setValue([receivedEntry]);
        }

        this.cdr.detectChanges();
      }
    });
  }

  addBrandForm() {
    this.form = this.formbuilder.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],

      countryCode: [966],
      countryCodeIso: ['SA'],
      phoneNumber: [null, [Validators.required]],
      brands: [null, [Validators.required]],
    });
  }
  onItemSelect(item: any) {}

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
    let ar: any[] = [];
    if (this.form.valid) {
      this.form.value.brands.forEach((element: any, index: any) => {
        element.branchId = element?.id;
        ar.push(element?.id);
      });
      this.form.value.brands = ar;
      this.spinner.show();
      this.manageBranchDirectorService
        .addBranchDirector(this.form.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('users.addSuccess'));
            this.activeModal.close();
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
          },
        });
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
