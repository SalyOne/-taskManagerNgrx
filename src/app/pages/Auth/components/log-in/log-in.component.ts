import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  form: FormGroup = new FormGroup({

    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    
  }

  submit(){

    this.authService.login(this.form.value).subscribe(res =>{
      this.router.navigate(['/'])
    })


  }

  

}
