import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBrandComponent } from '../../brand-manager/add-brand/add-brand.component';
import { AddCameraComponent } from './add-camera/add-camera.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { OrderManagementService } from 'src/app/services/api/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandService } from 'src/app/services/api/brand.service';
import { BranchesService } from 'src/app/services/api/branches.service';
import { Router } from '@angular/router';
import { ValidationPattern } from 'src/app/modules/SharedComponent/helper/validator';

@Component({
  selector: 'app-add-new-branch',
  templateUrl: './add-new-branch.component.html',
  styleUrls: ['./add-new-branch.component.scss'],
})
export class AddNewBranchComponent implements OnInit {
  form: FormGroup;
  visibleCameras: boolean;
  lang: string = String(localStorage.getItem('language'));
  searchText: string | undefined = this.lang === 'ar' ? 'بحث' : 'Search';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  brandsList: any[] = [];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  dropdownSettingsCountries = {};
  isValidFormSubmitted: boolean | null = null;
  cities: any[] = [];
  countries: any[] = [];
  selectedItemsCities: any;

  selectedItemsCountry: any;
  name = this.lang === 'ar' ? 'nameAr' : 'nameEn';
  isInValidNumber=false;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private modalService: NgbModal,
    private router: Router,
    private brandService: BrandService,
    private branchesService: BranchesService
  ) {
    this.form = this.formBuilder.group({
      brandId: [null, [Validators.required]],
      branches: this.formBuilder.array([
        this.formBuilder.group({
          name: [null, [Validators.required]],
          cityId: [null],
          countryId: [null],
          selectedItemsCountry: [null, [Validators.required]],
          selectedItemsCity: [null, [Validators.required]],
          location: [
            null,
            [
              Validators.required,
              Validators.pattern(ValidationPattern.urlPattern),
            ],
          ],
          reference: [null, [Validators.required]],
          firstcamera: [null, [Validators.pattern('^[0-9]*$')]],
          cameras: [null],
        }),
      ]),
    });
  }
  onItemSelectCountry(item: any) {
    this.getCitites(item.id);
  }
  addBranch() {
    this.branches.push(
      this.formBuilder.group({
        name: [null, [Validators.required]],
        cityId: [null],
        countryId: [null],
        selectedItemsCountry: [null, [Validators.required]],
        selectedItemsCity: [null, [Validators.required]],
        location: [
          null,
          [
            Validators.required,
            Validators.pattern(ValidationPattern.urlPattern),
          ],
        ],
        firstcamera: [null, [Validators.pattern('^[0-9]*$')]],
        reference: [null, [Validators.required]],
        cameras: [null],
      })
    );
  }
  camerasChange(option: any, index: number) {
    this.branches.value[index].cameras = [
      { number: option.value?.firstcamera },
    ];
  }
  onItemSelect(item: any) {
    this.form.get('brandId')?.setValue(item.id);
  }
  onSelectAll(items: any) {}

  get branches() {
    return this.form.get('branches') as FormArray;
  }
  ngOnInit(): void {
    this.initDropDownList();
    this.initDropDownListCountries();
    this.getBrands();
    this.getCountry();
  }
  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.searchText,
    };
  }
  getBrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.dropdownList = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  submit() {
    this.isValidFormSubmitted = false;
    this.form.value.branches.forEach((element: any) => {
      if (element.selectedItemsCountry && element.selectedItemsCountry.length) {
        element.countryId = element.selectedItemsCountry[0]?.id;
      }
      if (element.selectedItemsCity && element.selectedItemsCity.length) {
        element.cityId = element.selectedItemsCity[0]?.id;
      }
    });

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((field) => {
        // {1}
        const control = this.form.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    this.isValidFormSubmitted = true;
    if (this.form.valid &&!this.isInValidNumber) {
      this.spinner.show();
      this.branchesService
        .addBranch(this.form.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('users.addSuccess'));
            this.router.navigate(['admin/branches-management']);
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
          },
        });
    }
  }
  checkRefrence(event: any) {
    if (event.target.value) {
      this.branchesService
        .checkRefrence(event.target.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.isInValidNumber=false;
          },
          error: (err) => {
            this.toastr.error(err.error.error.message);
            this.isInValidNumber=true;
          },
        });
    }
  }
  initDropDownListCountries() {
    this.dropdownSettingsCountries = {
      singleSelection: true,
      idField: 'id',
      textField: this.name,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.searchText,
    };
  }
  removeCities() {
    this.cities = [];
  }
  getCountry() {
    this.brandService.getAllCountries().subscribe((res) => {
      this.countries = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  getCitites(countryId: number) {
    this.brandService.getAllCitites(countryId).subscribe((res) => {
      this.cities = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  addNewCamera(index: number) {
    const modalRef = this.modalService.open(AddCameraComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.cameradata = this.branches.value[index].cameras;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      // this.branches.value[index].cameras = receivedEntry;
      this.branches.at(index).patchValue({
        cameras: receivedEntry,
      });
      // this.form.get('brandId')?.setValue(receivedEntry?.id);
      // // this.branches.push(this.selectedItems);
      // this.cdr.detectChanges();
    });
  }
}
