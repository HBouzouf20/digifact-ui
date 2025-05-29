import { Q } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/layout/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService : AuthService, private toaster : ToastService, private translator: TranslateService) {}

  signup() {

    const user : User = {
      username :this.username,password : this.password,email :this.email
    }
    this.authService.signup(user).subscribe();
    this.translator.get('auth.message.success').subscribe(value => {
      this.toaster.showSuccess(value);
      setInterval(()=> {
        this.login();
      },2000)

    })
  }

  login() {
    this.router.navigate(['auth'])
  }
}
