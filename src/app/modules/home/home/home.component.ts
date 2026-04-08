import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUsService } from 'src/app/services/api/contact-us.service';
import { ValidationPattern } from '../../SharedComponent/helper/validator';

import { first } from 'rxjs';
import { TranslationService } from 'src/app/i18n';
import { Constants } from 'src/app/services/Constants/constants';
import { ViewVideoComponent } from '../view-video/view-video.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  currentLanguage: any;
  identityURL = 'environment.oAuthConfig.issuer';
  isAuthenticated: boolean;
  tab = 1;
  language: LanguageFlag;
  userModalForm: FormGroup;
  langs = languages;
  token: string | undefined;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private contactUsService: ContactUsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    this.token = undefined;
  }

  ngOnInit(): void {
    // this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
    //   console.log('This is your token: ', token);
    // }, {
    //     useGlobalDomain: false
    // });

    this.currentLanguage = localStorage.getItem('language');
    this.adduserForm();
    this.currentUser = this.authService.getCurrentUser();

    this.activatedroute.data.subscribe((data) => {
      if (history.state.id == 1) {
        this.goToHome();
      } else if (history.state.id == 2) {
        this.goToAbout();
      } else if (history.state.id == 3) {
        this.getToDisad();
      } else if (history.state.id == 4) {
        this.dashboard();
      } else if (history.state.id == 5) {
        this.video();
      } else if (history.state.id == 4) {
        this.dashboard();
      }
    });
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);

    document.location.reload();
  }

  switchLang() {
    if (this.currentLanguage === 'en') {
      this.translationService.setLanguage('ar');

      document.location.reload();
    } else {
      this.translationService.setLanguage('en');

      document.location.reload();
    }
  }
  openViewVideoModal() {
    const modalRef = this.modalService.open(ViewVideoComponent, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  dashboard() {
    console.log(this.currentUser);

    if (
      this.currentUser &&
      this.currentUser['roles'][0] == Constants.AllRoles.ThalolSuperAdmin
    ) {
      this.router.navigate(['/admin/brand-manager']);
    } else if (
      this.currentUser &&
      this.currentUser['roles'][0] == Constants.AllRoles.ThalolBrandDirector
    ) {
      this.router.navigate(['/admin/smart-dashboard']);
    } else if (
      this.currentUser &&
      this.currentUser['roles'][0] == Constants.AllRoles.ThalolCasheir
    ) {
      this.router.navigate(['/admin/water-dashboard']);
    } else if (
      this.currentUser &&
      this.currentUser['roles'][0] == Constants.AllRoles.ThalolBranchDirector
    ) {
      this.router.navigate(['/admin/smart-dashboard']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  goToAbout() {
    document
      .getElementById('about-sec')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
  goToHome() {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  }
  getToDisad() {
    document.getElementById('disadv')?.scrollIntoView({ behavior: 'smooth' });
  }

  contactUs() {
    document
      .getElementById('contactUs')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
  video() {
    document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
  }

  adduserForm() {
    this.userModalForm = this.formbuilder.group({
      message: [
        null,
        [
          Validators.required,
          // Validators.pattern(ValidationPattern.donotContainSpecialChar),
          ,
        ],
      ],
      recaptcha: [null],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(ValidationPattern.Email),
        ]),
      ],

      phoneNumber: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.pattern('[0-8]{9}')
          Validators.pattern(ValidationPattern.Mobile),
        ]),
      ],
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(ValidationPattern.arabicAndEnglishOnly),
        ],
      ],
      countryCode: [966],
      countryCodeIso: ['SA'],
    });
  }
  addContact() {
    console.log(this.userModalForm.value);
    if (this.userModalForm.invalid) {
      Object.keys(this.userModalForm.controls).forEach((field) => {
        // {1}
        const control = this.userModalForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    this.spinner.show();
    if (this.userModalForm.valid) {
      this.contactUsService
        .addContactUs(this.userModalForm.value)
        .pipe(first())
        .subscribe({
          next: (user) => {
            this.spinner.hide();

            // this.toastr.success(
            //   this.translate.instant('landingPage.addSuccess')
            // );

            this.toastr.success(
              this.translate.instant('landingPage.addSuccess'),
              '',
              { timeOut: 5000 }
            );

            this.userModalForm.reset();
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
            console.log(err);
          },
        });
    }
  }
  changeStatus(input: any) {
    this.tab = input;
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'ar',
    name: 'العربيه',
    flag: './assets/media/flags/saudi-arabia.svg',
  },
];
