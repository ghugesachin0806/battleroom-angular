import { Component } from '@angular/core';
import { StorageService } from './auth-services/storage-service/storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'battleroom-angular';

  isUserLoggedIn!: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateUserLoggedInStatus();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        this.updateUserLoggedInStatus();
      }
    })
  }

  private updateUserLoggedInStatus(): void {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  logout()
  {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
