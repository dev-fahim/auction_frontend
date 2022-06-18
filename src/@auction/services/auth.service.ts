import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {TOKEN_KEY} from "../contants";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) { }

  get token(): string | null {
    return StorageService.get(TOKEN_KEY);
  }

  login(token: string): void {
    StorageService.set(TOKEN_KEY, token);
  }

  logout(): void {
    StorageService.remove(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    if (this.token) {
      const decoded = jwtDecode(this.token);
      if (decoded) {
        return true;
      }
    }
    return false;
  }
}
