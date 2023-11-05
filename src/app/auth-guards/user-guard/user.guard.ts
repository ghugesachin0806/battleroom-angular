import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "src/app/auth-services/storage-service/storage.service";

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router,private snackBar:MatSnackBar) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(!StorageService.isUserLoggedIn())
    {
      StorageService.logout();
      this.router.navigateByUrl("/login");
      this.snackBar.open("You are not login ! ","Close",{duration:5000});
      return false;
    }

    return true;

  }
  }