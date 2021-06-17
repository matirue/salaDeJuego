import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatosDeLogueo, User, User_Mensaje } from '../class/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user = new User();

  //para registro
  referencia: AngularFirestoreCollection<User>;
  usuario: User;

  //para Login
  referencia_login: AngularFirestoreCollection<DatosDeLogueo>;
  usuario_login: DatosDeLogueo;


  mostrarAlert: boolean = false;
  mensajeAlert: string = '';

  constructor( 
    private afAuth: AngularFireAuth,
    private router: Router,
    private dataBase : AngularFirestore,
    private dataBase_angFireDB: AngularFireDatabase
    ) { 
      this.referencia = dataBase.collection('users');
      this.usuario = new User();

      this.referencia_login = dataBase.collection('LoggedInUsers');
      this.usuario_login = new DatosDeLogueo();

      this.referencia_mensaje = dataBase_angFireDB.list(this.urlBD_mensaje);
    }


    ngValidarError( error: string ) {
      console.log(error);
      switch (error) {
          case 'auth/argument-error':
            error = 'Debe completar todos los campos';
            break;
          case 'auth/invalid-email':
            error = 'Formato de email no correcto';
              break;
          case 'auth/user-not-found':
            error = 'Usuario no valido';
              break;
          case 'auth/wrong-password':
            error = 'Contraseña incorrecta';
                break;
          default:
            error = 'ERROR';
            break;
        }
  
      this.mostrarAlerta(error);
      }
    // muestro el alert
    mostrarAlerta(error: string) {
      this.mostrarAlert = true;
      this.mensajeAlert = error;
    }
    

    async Ingresar_service(email:string, password:string) {   
      if(email == '' && password == ''){
        alert("ERROR, Campos vacios!!!");
      }
      else if(email == ''){
        alert("ERROR, Email vacios!!!");
      }
      else if(password == ''){
        alert("ERROR, Contraseña vacios!!!");
      }
      else{
        
        try{
          const miUsuario = await this.afAuth.signInWithEmailAndPassword(email, password);

          if(email){
            if(miUsuario.user?.uid){

              this.usuario.uid = miUsuario.user.uid;
              this.usuario.tiempoLogin = new Date();

              this.referencia_login.add({...(this.usuario_login)}).then( () => [
                console.log("Ingreso en la bd")
              ]);
            }
            this.router.navigate( ['/home'] );
          }
          else{
            throw new Error;
          }
        }catch(e){
          this.ngValidarError(e);
        }       
      }
    }
    


  async Registrar_service(nombre: string, email:string, password:string) { 
   try{
     const miUser = await this.afAuth.createUserWithEmailAndPassword(email, password);

     if (email){
       if(miUser.user?.uid){
         this.usuario.uid = miUser.user.uid;
         this.usuario.nombre = nombre;
         this.usuario.email = email;
         this.usuario.tiempoLogin = new Date();

          //agrego la info del usuario en la bd
         this.referencia.add({...this.usuario}).then( () => [
           //alert("Usuario registrado con Exito!!!"),
           console.log("Usuario registrado con Exito!!!")
         ]);
         this.router.navigate(['/login']);
         //this.router.navigate(['/home']);
       }
      }
      else {
        throw new Error;
      }
   }catch(e){
    this.ngValidarError(e);   
   }    
  }

  async Desloguearse_service() {     
    try{
      return await this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
      });
    }catch(e){
      console.log(e);
    }
  }

  getUsuario_service() { 
    return  this.afAuth.authState.pipe(first()).toPromise();
  }

//********************Seccion chat***************************** */
private urlBD_mensaje = '/Mensaje';

referencia_mensaje: AngularFireList<User_Mensaje>;

getAll(): AngularFireList<User_Mensaje> {
  return this.referencia_mensaje;
}

Crear(dato: User_Mensaje): any {
  return this.referencia_mensaje.push(dato);
}

Borrar(dato: string): Promise<void> {
  return this.referencia_mensaje.remove(dato);
}

BorrarTodo(): Promise<void> {
  return this.referencia_mensaje.remove();
}

Actualizar(dato: string, algo: any): Promise<void> {
  return this.referencia_mensaje.update(dato, algo);
}





//********************fin Seccion chat***************************** */




}


