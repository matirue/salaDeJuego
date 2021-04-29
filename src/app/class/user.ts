import { AbstractControl } from '@angular/forms';

export class User {
    id: string = '';
    nombre: string = '';
    email: string = '';
    password: string = '';
    uid : string = '';
    tiempoLogin: Date = new Date();
    //agregar historial del juego

    puntaje: number = 0;
    puntajemoneda: number = 0;
}

export class DatosDeLogueo{
    uid: string = '';
    tiempoLogin: Date = new Date();
}

export class User_Mensaje {
  id: string = '';
  usuario: string = '';
  mensaje: string = '';
  fecha: string = '';
}



export function ConfirmarPassword(pass: AbstractControl) {

    if(pass && (pass.value !== null || pass.value !== undefined)){

      const confirmarPass = pass.value;
      const controlPass = pass.root.get('password'); 
  
      if(controlPass){
        const passValue = controlPass.value;
        
        if(passValue !== confirmarPass || passValue === ''){
          return{ isError: true };
        }
      }
    }
    return null;
  }