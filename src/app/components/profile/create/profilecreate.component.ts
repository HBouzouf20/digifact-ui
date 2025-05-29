import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/layout/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './profilecreate.component.html'
})
export class ProfileCreateComponent implements OnInit {
  userForm!: FormGroup;
  profiles: any[] = [];
  showErrors = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private toast: ToastService, private router: Router
  ) {}

  ngOnInit(): void {
    this.profiles = [{
        label : 'Utilisateur',
        state : 'ROLE_USER'
    }, {
        label : 'Admin',
        state : 'ROLE_ADMIN'
    }];

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // enabled: [true]
    });
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.userForm.get(controlName);

    return (
        (control?.hasError(errorType) && control?.touched)!! ||
        (control?.hasError(errorType) && this.showErrors)!!
    );
}

  createUser(): void {
    if (this.userForm.valid) {
      this.authService.signup(this.userForm.value).subscribe({
        next: () => {
          this.toast.showSuccess(
            'User was created Successfully !'
        );
        this.router.navigate(['/profile']);
      },
        error: (err) =>  {
          this.toast.showError(err.error || 'An unexpected error occurred')
          console.log(err.error);
          
        }
      });
    } else {
        this.showErrors = true;
    }
  }
}
