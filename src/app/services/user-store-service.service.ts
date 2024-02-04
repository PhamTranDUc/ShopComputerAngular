import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  public fullName$ = new BehaviorSubject<string>('');
  public role$ = new BehaviorSubject<string>('');
  constructor() {}

  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRoleForStore(role: string) {
    this.role$.next(role);
  }
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }
  logOut() {
    localStorage.clear();
  }
}
