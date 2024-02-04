import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserDetailService } from '../services/user-detail.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  iconCart = faCartShopping;

  public fullName: string = '';
  // public fullName: Observable<string> = new Observable<string>();
  constructor(
    public userService: UserService,
    private router: Router,
    private userDetailService: UserDetailService,
    private authService: AuthService
  ) {}

  // ngOnInit() {
  //   this.fullName = this.userStoreService.getFullNameFromStore();
  // }

  // ngOnInit() {
  //   this.userStoreService.getFullNameFromStore().subscribe({
  //     next: (response: any) => {
  //       let fullNameFromToken = this.userService.getFullNameFromToken();
  //       this.fullName = fullNameFromToken;
  //       console.log(this.fullName);
  //     },
  //     complete: () => {},
  //     error: (error: any) => {
  //       console.error('Error fetching Data: ', error);
  //     },
  //   });
  // }

  // ngOnInit(){
  //   this.userDetailService.getUserNameInUserDetail().subscribe(val=>{
  //     let userName = this.authService.getUserNameFromToken();

  //     this.fullName= userName || val;
  //   })
  // }

  ngOnInit() {
    this.fullName = localStorage.getItem('userName') || '';
  }
  logOut() {
    this.userService.logOut();
  }
}
