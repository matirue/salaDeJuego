import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../service/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
/*
  registroForm = new FormGroup( { 
    nombre: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    });*/

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,    
    public router: Router,
    private firebase : FirebaseService,
    ) { }
  /*** Validaciones */ 
    registroForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"),
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });  
  /** Propiedades que validan el dato */
  get Nombre() {
    return this.registroForm.get("nombre");
  }

  get Email() {
    return this.registroForm.get("email");
  }

  get Password() {
    return this.registroForm.get('password')
  }
  /********************************************/  
  

  Registrar(){
    //console.log('Form->', this.registroForm.value);    
    this.authService.Registrar_service(this.Nombre?.value, this.Email?.value, this.Password?.value).then((res : any) => {
      var json = { //meter historial de las partidas
        
      };
      this.router.navigateByUrl('/home');
      this.firebase.addData('games', res.user.uid, json); //cargo el historial a la bd
    }).catch(error => console.log(error))
  }

  /** Mensajes de errores */
  public errorMessages ={
    nombre:[
      {type: 'required', message: 'Falta el nombre'},
      {type: 'minlength', message: 'Nombre con un minimo de 3 caracteres'}
    ],
    email: [
      {type: 'required', message: 'Falta email eletrónico'},
      {type: 'pattern', message: 'El email no es valido'}
    ],
    password:[
      {type: 'required', message: 'Falta contraseña'},
      {type: 'minlength', message: 'Contraseña con un minimo de 8 caracteres'}
    ]   
  }
  /***************************************************/

  ngOnInit(): void {
  }

}
