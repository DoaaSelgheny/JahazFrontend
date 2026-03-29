import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { Constants } from 'src/app/services/Constants/constants';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  currentUser: any;
  
  roles=Constants.AllRoles
  constructor(private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.currentUser =  this.authService.getCurrentUser()
    this.authService.getcurrentUser().subscribe((res) => {
      this.currentUser = res.currentUser;
      this.cdr.detectChanges();
    });
  }
}
