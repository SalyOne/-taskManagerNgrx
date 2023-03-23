import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(
    private cookieService: CookieService
  ) { }

  setCookie(name:string, value:string, date?: Date){

    this.cookieService.set(name, value,{
      expires: date,
      sameSite: 'Strict',
      secure: true,
      path: '/',
      domain: `http://task-manager-production-40ea.up.railway.app/api/`
    })
  }


  getCookie(name: string){
    return this.cookieService.get(name)
  }


  deleteCookie(name:string){
    this.cookieService.delete(name)
  }


  deleteAllcookies(){
    this.cookieService.deleteAll()
  }

}
