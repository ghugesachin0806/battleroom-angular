import { Injectable } from '@angular/core';

const TOKEN = 'c_token';
const USER = 'c_user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getUserId(): string {
    const storedData = localStorage.getItem(USER);
  
    if (storedData !== null) {
      const user = JSON.parse(storedData);
      if (user.userId) {
        return user.userId;
      }
    }
    return '';
  }
  

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static isUserLoggedIn() {
    if (this.getToken() == null) {
      return false;
    }

    return true;
  }

  static logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
