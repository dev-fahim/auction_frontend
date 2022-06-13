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
    return this.storage.get(TOKEN_KEY);
  }

  login(token: string): void {
    this.storage.set(TOKEN_KEY, token);
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
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
