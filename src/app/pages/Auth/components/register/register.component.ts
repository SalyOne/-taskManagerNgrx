import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
form: FormGroup = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),

})

constructor(

  private authService: AuthService,
  private router: Router
){

}
ngOnInit(): void {


  
}

submit(){
  this.authService.register(this.form.value).subscribe(res => {
    this.router.navigate(['/auth/login'])
  })
  
}

  
}
