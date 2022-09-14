import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }

  public static get(key: string): string | null {
    return localStorage.getItem(key) ?? null;
  }
}
