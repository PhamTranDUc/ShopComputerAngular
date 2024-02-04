import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { userDto } from '../dtos/user.dto';
import { log } from 'console';
import { UserStoreService } from '../services/user-store-service.service';
@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;
  userData: any;
  loginFailed: boolean = false;
  user: userDto | any;
  constructor(
    private userService: UserService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      user_name: new FormControl(''),
      password: new FormControl(''),
    });
  }
  loginFunction() {
    this.userService.login(this.login.value).subscribe({
      next: (response: any) => {
        console.log('next1');
        // console.log(response);
        this.userService.saveTokenToStorage(response.token);
        const userDetail = this.userService.decodedToken();
        this.userStoreService.setFullNameForStore(userDetail.userName);
        if(userDetail.role === 'ADMIN'){
          
        }
        this.userStoreService.setRoleForStore(userDetail.role);

        if (userDetail.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
        console.log(userDetail);
        // console.log(this.token);
      },
      error: (error: any) => {
        console.log(this.login.value);
        console.log(error);
        alert(`Cannot login, error: ${error.error}`);
      },
    });
  }
}
