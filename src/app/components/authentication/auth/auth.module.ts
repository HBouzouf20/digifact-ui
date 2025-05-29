import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { SignupComponent } from './signup/signup.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent
  ],
  imports: [
    CommonModule, 
    AuthRoutingModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    AppConfigModule,
    RippleModule,
    TranslateModule
  ]
})
export class AuthModule { }
