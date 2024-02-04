import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/user-store-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  iconCart = faCartShopping;
  public fullName: Observable<string> = new Observable<string>();
  // public fullName: string = '';
  constructor(
    public userService: UserService,
    private router: Router,
    public userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.fullName = this.userStoreService.getFullNameFromStore();

    // const fullNameFromToken = this.userStoreService.getFullNameFromStore();
    // this.userStoreService.setFullNameForStore(fullNameFromToken);
  }

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

  logOut() {
    this.userStoreService.logOut();
    this.router.navigate(['login']);
  }
}
