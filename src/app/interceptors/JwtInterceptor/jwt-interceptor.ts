import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { ToastService } from 'src/app/layout/toast.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private toaster : ToastService, private router : Router,
    private translator : TranslateService,
    private authService : AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenService.getToken();
    if (token && this.tokenService.isTokenExpired(token)) {
      console.log("Token expired");

      this.tokenService.removeToken();
      this.translator.get('token.expired').subscribe(value => {
        this.toaster.showInfo(value)
        setTimeout(()=> {
          this.router.navigate(['/auth']);
        },2000);
      })

    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        console.log("error", error);

        if (error.error.detail && error.error.detail.includes("JWT validity")) {
          this.authService.logout();
          this.translator.get('token.expired').subscribe(value => {
            if (confirm(value)) {
              this.authService.logout();
              this.router.navigate(['/auth']);

            } else {

              setTimeout(()=> {
              this.toaster.showInfo(value)

              },2000);
            }

          })
        }
        return throwError(error);
      })
  )}


}
