import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm = new FormGroup( { 
    nombre: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    });

  constructor() { }

  Registrar(){

    console.log('Form->', this.registroForm.value);
  }



  ngOnInit(): void {
  }

}
