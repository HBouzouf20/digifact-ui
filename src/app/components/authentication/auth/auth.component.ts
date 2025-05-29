import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

	constructor(private layoutService: LayoutService,private authService: AuthService, private router: Router) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

  login() {
    this.authService.login(this.email, this.password, this.rememberMe).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'error.invalidemailorpassword';
        }
      }
    );
  }

  signup() {
    this.router.navigate(['auth/signup']);
  }
}
