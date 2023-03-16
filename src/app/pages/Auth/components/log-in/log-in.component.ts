import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  errorMsg:any

  hide = true
  get getEmail(){
    return this.form.get('email')
  }

  get getPassword(){
    return this.form.get('password')
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  form: FormGroup = new FormGroup({

    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15),])
  })

  ngOnInit(): void {

  }
  submit(){
    this.authService.login(this.form.value).subscribe(res =>{
      this.router.navigate(['/home'])
    }, (error)=>{
      this.errorMsg = error
      console.log(error)
    })
  }
}
