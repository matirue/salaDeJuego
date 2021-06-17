import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../service/firebase.service';
import { ConfirmarPassword } from 'src/app/class/user';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;

  mostrarAlert = false;
  mensajeAlert = '';

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private firebase: FirebaseService,
  ) {
    /*** Validaciones */
    this.form = this.formBuilder.group( {
      nombre: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"),
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  Registrar() {

    this.form.markAllAsTouched();//verifica los campos y los marca como tocado

    if(this.form.valid && (this.form.get('email')?.value !== '' && this.form.get('password')?.value !== '' && this.form.get('nombre')?.value !== '')){
      this.authService.Registrar_service(this.form.get('nombre')?.value,
                                        this.form.get('email')?.value,
                                        this.form.get('password')?.value);
                                        
      console.log('>> Form: ', this.form);                                 
      console.log('>> Ususario registrado');
    }
    else if(this.form.get('email')?.value !== '' && this.form.get('password')?.value === '' && this.form.get('nombre')?.value !== ''){
      //alert("Fatla contraseña");
      this.mostrarAlerta("Fatla contraseña");
    }
    else if(this.form.get('email')?.value === '' && this.form.get('password')?.value !== '' && this.form.get('nombre')?.value !== ''){
      //alert("Fatla email");
      this.mostrarAlerta("Fatla email");
    }
    else if(this.form.get('email')?.value !== '' && this.form.get('password')?.value !== '' && this.form.get('nombre')?.value === ''){
      //alert("Fatla nombre");
      this.mostrarAlerta("Fatla nombre");
    }
    else if(this.form.get('email')?.value !== '' && this.form.get('password')?.value === '' && this.form.get('nombre')?.value === ''){
      //alert("Fatla nombre");
      this.mostrarAlerta("Fatla nombre y contraseña");
    }
    else if(this.form.get('email')?.value === '' && this.form.get('password')?.value === '' && this.form.get('nombre')?.value !== ''){
      //alert("Fatla nombre");
      this.mostrarAlerta("Fatla email y contraseña");
    }
    else if(this.form.get('email')?.value === '' && this.form.get('password')?.value !== '' && this.form.get('nombre')?.value === ''){
      //alert("Fatla nombre");
      this.mostrarAlerta("Fatla email y nombre");
    }
    else if(this.form.get('email')?.value === '' && this.form.get('password')?.value === '' && this.form.get('nombre')?.value === ''){
      //alert("Ambos campos estan vacios");
      this.mostrarAlerta("Todos los campos estan vacios");
    }
    else if(this.form.get('email')?.value !== '' && ((this.form.get('password')?.value).minLength < 8) && this.form.get('nombre')?.value !== ''){
      //alert("Ambos campos estan vacios");
      this.mostrarAlerta(" La contraseña debe tener al menos 8 caracteres ");
    }
    else{
      //alert("ERROR en el registro!!!!!");
      this.mostrarAlerta(" en el registro!!!!!");
      
    }
  }

  // muestro el alert
  mostrarAlerta(error: string) {
    this.mostrarAlert = true;
    this.mensajeAlert = error;
  }

  ngOnInit(): void {
  }

}
