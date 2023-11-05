import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (StorageService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/dashboard');
      return false;
    }
    return true;
  }
}
