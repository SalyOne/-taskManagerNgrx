
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces';
import { AuthResponse, Login,Register } from '../interfaces/auth';
import { BaseService } from './base.service';
import { CookieStorageService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {


  constructor(
    private cookieStorageService: CookieStorageService,
    http: HttpClient
  ){
   super(http)
  }


  get user(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }


login(payload:Login): Observable<AuthResponse>{
  return this.post<AuthResponse>( 'auth/login', payload)
  .pipe(
    tap((response: AuthResponse) => {
    const cookieExpire = new Date(Date.now()+24 * 60 * 60 * 1000)


    this.cookieStorageService.setCookie(
         'token',
         response.token.accessToken,
         cookieExpire

      );

      this.cookieStorageService.setCookie(
        'refreshToken',
        response.token.refreshToken
      )


      this.setUser(response.user)
    })
  )
}


get token(): string{
  return this.cookieStorageService.getCookie('token')
}


get refreshToken():string{
  return this.cookieStorageService.getCookie('refreshToken')
}



  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

register(payload:Register): Observable<AuthResponse>{
  return this.post<AuthResponse>('auth/signup', payload)
}

signOut(){
  localStorage.clear()
  this.cookieStorageService.deleteCookie('token')
  this.cookieStorageService.deleteCookie('refreshToken')
  this.cookieStorageService.deleteAllcookies()

}

}
