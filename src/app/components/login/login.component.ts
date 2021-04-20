import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../service/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  users:any;

  /*loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });*/

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private firesbase : FirebaseService
  ) { 
    this.traerUsuarios();
  }

  get Email() {
    return this.loginForm.get("email");
  }

  get Password() {
    return this.loginForm.get('password')
  }

  loginForm = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  });


  ngOnInit(): void {
  }

  traerUsuarios(){
    this.firesbase.getDataQuery('users').subscribe(element =>{
      this.users = element;
    })
  }
  
  Ingresar(){
    //console.log('Form->', this.loginForm.value);
    this.authService.Ingresar_service(this.Email?.value, this.Password?.value).then(res => {

      this.users.forEach((element: { email: any; }) => {
        if(element.email == this.Email?.value){
          localStorage.setItem('userCurrent', JSON.stringify(element));
          this.router.navigateByUrl('/home');
        }
      });      
    }).catch(error => console.log(error))
  }
}
