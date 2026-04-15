import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, first, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebApiService } from 'src/app/services/webApi.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslationService } from 'src/app/i18n/translation.service';
import { MessagingService } from 'src/app/services/api/messaging.service';
import { getMessaging, onMessage } from 'firebase/messaging';
import { Constants } from 'src/app/services/Constants/constants';
import { NotificationType } from 'src/app/services/enums/notification.enum';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = ``;
  public image: any;
  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private webApi: WebApiService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private messagingService: MessagingService,
    private router: Router,
    private translate: TranslationService,
    private toastr: ToastrService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  singUp(body: any) {
    return this.webApi.post(
      'api/app/manage-service-provider/register-service-provider',
      body
    );
  }

  resendEmail(email: string) {
    return this.webApi.post(
      `api/app/manage-service-provider/resend-confirmation-email?email=${email}`
    );
  }

  verificationCode(body: any) {
    return this.webApi.post(
      'api/app/manage-account/verify-verification-code-at-register',
      body
    );
  }

  manageIndustry() {
    return this.webApi.get('api/app/manage-industry');
  }

  ServiceProviderDeatiles(id: number) {
    return this.webApi.get(
      `api/app/manage-service-provider/${id}/service-provider-details`
    );
  }

  editServiceProviderDeatiles(body: any) {
    return this.webApi.post(
      'api/app/manage-service-provider/edit-service-provider',
      body
    );
  }

  changePassword(body: any) {
    return this.webApi.post('api/app/manage-account/change-password', body);
  }

  GetClinetById(id: any) {
    return this.webApi.get(`api/app/manage-client/${id}/client-by-id`);
  }
  getImage() {
    this.getcurrentUser().subscribe((res) => {
      this.image = res.imageUrl;
      return res.imageUrl;
    });
  }
  login(param: any) {
    this.spinner.show();
    setTimeout(() => this.spinner.show(), 400);
    this.messagingService.deleteToken();

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'Thalool_App');
    // body.set('scope', 'openid offline_access zalool');
    body.set('username', param.email);
    body.set('password', param.password);
    let headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': this.translate.getSelectedLanguage(),
    };
    let options = {
      headers: new HttpHeaders(headersConfig),
    };
    this.http
      .post(`${environment.api_url}connect/token`, body.toString(), options)
      .subscribe(
        (auth: any) => {
          this.spinner.hide();
          this.messagingService.requestPermission();
          this.listen();

          // this.isLoadingSubject.next(auth);
          this.setAuthFromLocalStorage(auth);
          this.getcurrentUser().subscribe((res) => {
            this.roleAndPermissions(res);
          });
          this.router.navigate(['/admin/water-dashboard']);
        },
        (mockError) => {
          setTimeout(() => {
            this.spinner.hide();
            console.log(mockError.error.error_description);
            this.toastr.error(mockError.error.error_description);
            console.log('error', mockError);
          }, 400);
        }
      );
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log(payload);

      let respones = payload;

      // this.audioPlayerRef.nativeElement.play();
      if (this.translate.getSelectedLanguage() === 'en') {
        this.toastr.info(payload.data?.titleEn);
      } else {
        this.toastr.info(payload.data?.titleAr);
      }
      if (payload.data?.NotificationType == NotificationType.InActiveBranch) {
        setTimeout(() => {
          this.logout();
        }, 1000);
      } else {
        setTimeout(() => {
          this.messagingService.getUnReadNotification();
        }, 1000);
      }
    });
  }
  logout() {
    this.messagingService.deleteToken();
    this.spinner.show();
    localStorage.removeItem('access_token_zalool');
    localStorage.removeItem('currentUserzalool');
    localStorage.removeItem('firebaestoken');
    localStorage.removeItem('authLocalStorageTokenzalool');
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/home']);
    setTimeout(() => {
      if (localStorage.getItem('access_token_zalool')) {
      }
      this.spinner.show();

      document.location.reload();
    }, 1000);
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.access_token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.getcurrentUser().pipe(
      map((user) => {
        if (user.isActive === false) {
          this.logout();
        } else if (user.currentUser) {
          this.currentUserSubject.next(user.currentUser);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  roleAndPermissions(data: any) {
    this.currentUserSubject.next(data['currentUser']);
    // admin
    localStorage.setItem(
      'currentUserzalool',
      JSON.stringify(data['currentUser'])
    );

    this.goToDefaultPage(data['currentUser']);
  }

  goToDefaultPage(user: any) {
    if (user['roles'][0] == Constants.AllRoles.ThalolSuperAdmin) {
      this.router.navigate(['/admin/brand-manager']);
    } else if (user['roles'][0] == Constants.AllRoles.ThalolBrandDirector) {
      this.router.navigate(['/admin/smart-dashboard']);
    } else if (user['roles'][0] == Constants.AllRoles.ThalolCasheir) {
      this.router.navigate(['/admin/water-dashboard']);
    } else if (user['roles'][0] == Constants.AllRoles.ThalolBusinessOperation) {
      this.router.navigate(['/admin/manager-dashboard']);
    } else if (user['roles'][0] == Constants.AllRoles.ThalolBranchDirector) {
      this.router.navigate(['/admin/smart-dashboard']);
    }
  }
  getcurrentUser() {
    return this.webApi.get('api/app/manage-account/current-user');
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access_token) {
      localStorage.setItem('authLocalStorageTokenzalool', JSON.stringify(auth));
      localStorage.setItem(
        'access_token_zalool',
        `Bearer ${auth.access_token}`
      );
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem('authLocalStorageTokenzalool');
      if (!lsValue) {
        return undefined;
      }
      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  getCurrentUser() {
    let currentUserObject = window.localStorage.getItem('currentUserzalool');
    return JSON.parse(currentUserObject!);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  // Activate email api
  ActivateCode(ConfirmEmailTokenId: any) {
    return this.webApi.post(
      `api/app/manage-account/confirm-email/${ConfirmEmailTokenId}`
    );
  }

  // Forget password api
  forgetPassword(email: string) {
    return this.webApi.post(
      `api/app/manage-account/forget-password?email=${email}`
    );
  }

  // Reset passowrd api
  resetPassword(body: any, token: any) {
    return this.webApi.post(`api/app/manage-account/reset-password`, {
      email: body.email,
      password: body.password,
      resetPasswordToken: token,
    });
  }

  isUsedLinkReset(token: any) {
    return this.webApi.post(
      `api/app/manage-account/is-used-link-reset-password?resetPasswordToken=${token}`
    );
  }
}
