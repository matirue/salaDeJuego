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
  loginForm: FormGroup;

  mostrarAlert = false;
  mensajeAlert = '';

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private firesbase : FirebaseService
  ) { 
    this.loginForm = this.formBuilder.group( {
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });

    this.traerUsuarios();    
  }


  ngOnInit(): void {
  }

  traerUsuarios(){
    this.firesbase.getDataQuery('users').subscribe(element =>{
      this.users = element;
    })
  }
  
  Ingresar(){
    //console.log('Form->', this.loginForm.value);
    if(this.loginForm.valid && (this.loginForm.get('email')?.value !== '' && this.loginForm.get('password')?.value !== '')){
      //ingreso
      this.authService.Ingresar_service(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
      console.log("deberia entrar...");
    }//errores
    else if(this.loginForm.get('email')?.value !== '' && this.loginForm.get('password')?.value === ''){
      //alert("Fatla contraseña");
      this.mostrarAlerta("Fatla contraseña");
    }
    else if(this.loginForm.get('email')?.value === '' && this.loginForm.get('password')?.value !== ''){
      //alert("Fatla email");
      this.mostrarAlerta("Fatla email");
    }
    else if(this.loginForm.get('email')?.value === '' && this.loginForm.get('password')?.value === ''){
      //alert("Ambos campos estan vacios");
      this.mostrarAlerta("Ambos campos estan vacios");
    }
    else{
      this.mostrarAlerta("Usuario no valido!");
    }
    
  }

  
  // muestro el alert
  mostrarAlerta(error: string) {
    this.mostrarAlert = true;
    this.mensajeAlert = error;
  }
  // cuando doy click al icono de "x" para cerrarlo 
  noMostrarAlert() {
    this.mostrarAlert = false;
  }
}
