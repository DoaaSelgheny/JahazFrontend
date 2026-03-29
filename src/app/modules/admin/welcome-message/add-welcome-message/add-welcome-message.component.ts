import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { BranchManagerService } from 'src/app/services/api/branch-manager.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { WelcomeMessageService } from 'src/app/services/api/welcome-message.service';
import { Constants } from 'src/app/services/Constants/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-welcome-message',
  templateUrl: './add-welcome-message.component.html',
  styleUrls: ['./add-welcome-message.component.scss'],
})
export class AddWelcomeMessageComponent implements OnInit {
  FileStorageNameUrl: any = null;
  FileStorageName: any = null;
  FiletName: any;
  productFileStorageNameUrl: any = null;
  productFileStorageName: any = null;
  productFiletName: any;
  messageModalForm: FormGroup;
  dropdownSettings = {};
  dropdownSettingNationality = {};
  brands: any;
  branchs: any;
  currentUser: any;
  isBrandManager: boolean;
  roles = Constants.AllRoles;
  id: any = 0;
  constructor(
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private brandService: BrandService,
    private branchManagerService: BranchManagerService,
    private welcomeMessageService: WelcomeMessageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addForm();

    this.id = this.route.snapshot.paramMap.get('id');

    this.authService.getcurrentUser().subscribe((res) => {
      this.currentUser = res.currentUser;
      if (
        this.currentUser['roles'][0] == Constants.AllRoles.ThalolBrandDirector
      ) {
        this.isBrandManager = true;
        this.getBrands();
      } else {
        this.isBrandManager = false;
        this.messageModalForm.get('branchId')?.clearValidators();
        this.messageModalForm.get('branchId')?.updateValueAndValidity();
        this.messageModalForm.get('brandId')?.clearValidators();
        this.messageModalForm.get('brandId')?.updateValueAndValidity();
      }

      this.cdr.detectChanges();
    });
    if (this.id) {
      this.getData();
    }
  }
  addForm() {
    this.messageModalForm = this.formbuilder.group({
      branchId: [null, [Validators.required]],
      welcomeMessage: [null, [Validators.required]],
      logoName: [null, [Validators.required]],
      logoStorageFileName: [null, [Validators.required]],
      menuImageName: [null, [Validators.required]],
      menuImageStorageFileName: [null, [Validators.required]],
      color: ['#a02220', [Validators.required]],
      brandId: [null, [Validators.required]],
    });
  }
  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: true,
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
  onItemSelect() {
    this.branchManagerService
      .getBranchByBrand(this.messageModalForm.get('brandId')?.value)
      .subscribe({
        next: (next) => {
          this.branchs = next;
          this.cdr.detectChanges();
        },
      });
  }
  getData() {
    this.spinner.show();
    this.welcomeMessageService.getByID(this.id).subscribe((res) => {
      this.messageModalForm.patchValue(res);
      this.id = res.id;
      this.FileStorageNameUrl = res.logoUrl;
      this.productFileStorageNameUrl = res.menuUrl;

      if (res.brandId) {
        this.branchManagerService.getBranchByBrand(res.brandId).subscribe({
          next: (next) => {
            this.branchs = next;
            this.cdr.detectChanges();
          },
        });
      }
      this.cdr.detectChanges();
      this.spinner.hide();
    });
  }
  uploadImg(data: any) {
    this.FileStorageNameUrl = environment.BlobUrl + data.storageFileName;
    this.FileStorageName = data.storageFileName;
    this.FiletName = data.fileName;
    this.messageModalForm.get('logoName')?.setValue(this.FiletName);
    this.messageModalForm
      .get('logoStorageFileName')
      ?.setValue(this.FileStorageName);
  }
  uploadImgProduct(data: any) {
    this.productFileStorageNameUrl = environment.BlobUrl + data.storageFileName;
    this.productFileStorageName = data.storageFileName;
    this.productFiletName = data.fileName;
    this.messageModalForm.get('menuImageName')?.setValue(this.productFiletName);
    this.messageModalForm
      .get('menuImageStorageFileName')
      ?.setValue(this.productFileStorageName);
  }
  public submit() {
    if (this.messageModalForm.invalid) {
      Object.keys(this.messageModalForm.controls).forEach((field) => {
        // {1}
        const control = this.messageModalForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    if (this.messageModalForm.valid) {
      this.spinner.show();
      this.welcomeMessageService
        .addMessage(this.messageModalForm.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.spinner.hide();
            if (!this.id) {
              this.toastr.success(this.translate.instant('users.addSuccess'));

              this.router.navigate(['admin/welcome-message-management']);
            } else {
              this.router.navigate(['admin/review-welcome-message/', this.id]);
            }
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
          },
        });
    }
  }
}
