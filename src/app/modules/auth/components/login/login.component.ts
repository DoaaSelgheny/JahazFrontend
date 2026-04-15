import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslationService } from 'src/app/i18n';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ValidationPattern } from 'src/app/modules/SharedComponent/helper/validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  selectedLanguage: any;
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  showPassword: boolean;
  currentLanguage: any;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService

  ) {
    this.isLoading$ = this.authService.isLoading$;
    if (localStorage.getItem('access_token_zalool'))  {
      this.router.navigate(['admin/water-dashboard']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.currentLanguage = localStorage.getItem('language');

  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(ValidationPattern.Email),
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.pattern(ValidationPattern.Password),
        ]),
      ],
    });
  }
  togglePasswordVisibilty() {
    this.showPassword = !this.showPassword;
  }
  submit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
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
}
