import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  // private userName$= new BehaviorSubject<string>('');
  // private role$= new BehaviorSubject<string>('');
  // constructor() { }
  // public getRoleInUserDetail(){
  //   return this.role$.asObservable();
  // }
  // public setRoleForUserDetail(role : string){
  //   this.role$.next(role);
  // }
  // public getUserNameInUserDetail(){
  //   return this.userName$.asObservable();
  // }
  // public setUserNameForUserDetail(userName : string){
  //   this.userName$.next(userName);
  // }
}
