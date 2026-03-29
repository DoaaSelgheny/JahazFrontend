
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderLayoutComponent implements OnInit {
  currentUser:any;
  currentLanguage: string;
  identityURL = "environment.oAuthConfig.issuer";
  isAuthenticated: boolean;
  tab = 0;
  language: string;
  homeHeader:boolean
  // get hasLoggedIn(): boolean {
  //   return this.oAuthService.hasValidAccessToken();
  // }

  constructor(
    // public languageService: LanguageService,
    // private sessionStateService: SessionStateService,
    private activatedroute: ActivatedRoute,
   
    // private authService: AuthService,
    // private appAuthService: AppAuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.appAuthService.isloading = true;
    // this.currentLanguage = this.sessionStateService.getLanguage() === 'en' ? 'العربية' : 'English';
    // this.language = this.sessionStateService.getLanguage() === 'en' ? 'ar' : 'en';
    // this.isAuthenticated = this.appAuthService.currentLoggedInUser$!.isAuthenticated;
    // this.currentUser = this.appAuthService.currentLoggedInUser$;
    // if (localStorage['firstTimeLoadsite'] != 'TRUE') {
    //   localStorage['firstTimeLoadsite'] = 'TRUE';

    //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //   //Add 'implements OnInit' to the class.
    //   this.currentUser = this.appAuthService.currentLoggedInUser$;

    //   if (this.currentUser!.roles[0] == 'TaharakServiceProvider') {
    //     this.router.navigateByUrl('/service-provider-dashboard');
    //     this.appAuthService.isloading = false;
    //   } else if (this.currentUser!.roles[0] == 'TaharakSuperAdmin') {
    //     this.router.navigateByUrl('/admin-dashboard');
    //   } else if (this.currentUser!.roles[0] == 'admin') {
    //     this.router.navigateByUrl('identity/roles');
    //   }
    // }
  }

  switchLang() {
    // let lang = this.sessionStateService.getLanguage() == 'en' ? 'ar' : 'en';
    // this.languageService.switchLanguage(lang);
    // this.currentLanguage = lang === 'en' ? 'عربي' : 'English';
    // this.language = lang === 'en' ? 'ar' : 'en';
  }
  getToAbout() {
    this.activatedroute.data.subscribe(data => {
      console.log(data);
      console.log(this.router.routerState.snapshot.url);
      // if (this.router.routerState.snapshot.url == '/home') {
      //   document.getElementById('about-sec').scrollIntoView({ behavior: 'smooth' });
      // } else {
      //   this.router.navigateByUrl('/home', { state: { id: '1', name: 'tab' } });
      // }
    });
   
    
  }

  getToDisad() {
    this.activatedroute.data.subscribe(data => {
      // if (this.router.routerState.snapshot.url == '/home') {
      //   document.getElementById('adv-disadv').scrollIntoView({ behavior: 'smooth' });
      // } else {
      //   this.router.navigateByUrl('/home', { state: { id: '2', name: 'tab' } });
      // }
    });
  }

  getDownload() {

    this.activatedroute.data.subscribe(data => {
      
      
      // if (this.router.routerState.snapshot.url == '/home') {
      //   document.getElementById('Download1').scrollIntoView({ behavior: 'smooth' });
      // } else {
      //   this.router.navigateByUrl('/home', { state: { id: '3', name: 'tab' } });
      // }
    });
   
  }
  login() {
    // this.authService.navigateToLogin();
  }

  logOut() {
    localStorage['firstTimeLoadsite'] = 'FALSE';
    localStorage.removeItem('Dashboard');
    localStorage.removeItem('CommissionReport');
    // this.appAuthService.logout();
  }
  changeStatus(input:any) {
    this.tab = input;
  }
}
