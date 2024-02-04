import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    phone_number: new FormControl(''),
    user_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    retype_password: new FormControl(''),
    address: new FormControl(''),
    date_of_birth: new FormControl(''),
    full_name: new FormControl(''),
    role_id: new FormControl(1),
  });
  constructor(private router: Router, private userService: UserService) {}

  registerFun() {
    debugger;
    this.userService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        debugger;
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.log(this.registerForm.value);
        alert(`Cannot register, error: ${error.error}`);
      },
    });
  }

  checkPhone() {}
  // checkPassWordMatch() {
  //   if (this.password !== this.retypePassword) {
  //     this.registerForm.form.controls['retypePassword'].setErrors({
  //       passWordMismatch: true,
  //     });
  //   } else {
  //     this.registerForm.form.controls['retypePassword'].setErrors(null);
  //   }
  // }
}
