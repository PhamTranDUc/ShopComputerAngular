import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  public users: any[] = [];

  public fullName: string = '';
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getAllAccount().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      complete: () => {},
      error: (error: any) => {
        console.log('Error fetching data Accounts: ', error);
      },
    });
  }

  isAdmin(): Observable<string> {
    console.log(this.userService.isAdmin());
    return this.userService.isAdmin();
  }
}
