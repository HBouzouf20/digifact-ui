import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { hasPermission, Permission } from '../components/authentication/permissions';

export const permissionGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getSignedUser();
  const module = route.data['module'] as string[];

  if(hasPermission(user!!,'view:'+module as Permission)) {
    return true;
      } else {
        router.navigate(['/']);
        return false;
      }


};
