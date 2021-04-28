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

    if(this.form.valid){
      this.authService.Registrar_service(this.form.get('nombre')?.value,
                                        this.form.get('email')?.value,
                                        this.form.get('password')?.value);
                                        
      console.log('>> Form: ', this.form);                                 
      console.log('>> Ususario registrado');
    }
    else{
      alert("ERROR en el registro!!!!!");
    }
  }

  ngOnInit(): void {
  }

}
