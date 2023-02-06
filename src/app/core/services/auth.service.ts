
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces';
import { AuthResponse, Login,Register } from '../interfaces/auth';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  get token(): string | null {
  return localStorage.getItem('token')
    
  } 

  get user(): User | null {

    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }


login(payload:Login): Observable<AuthResponse>{
  return this.post<AuthResponse>( 'auth/login', payload)
  .pipe(
    tap((response: AuthResponse) => {
      this.setToken(response.token.accessToken),
      this.setUser(response.user)
    })
  )
}
  setToken(token: string): void {
   localStorage.setItem('token', token);
  }


  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

register(payload:Register): Observable<AuthResponse>{
  return this.post<AuthResponse>('auth/signup', payload)
}

signOut(){
  localStorage.clear()
}

}
