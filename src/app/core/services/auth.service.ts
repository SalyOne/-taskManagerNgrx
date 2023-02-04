
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, Login,Register } from '../interfaces/auth';
import { User } from '../interfaces/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

login(payload:Login): Observable<AuthResponse>{
  return this.post<AuthResponse>( 'auth/login', payload)
}

register(payload:Register): Observable<AuthResponse>{
  return this.post<AuthResponse>('auth/signup', payload)
}


}
