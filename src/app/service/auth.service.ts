import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public usuario: User = new User();

  constructor( 
    private afAuth: AngularFireAuth,
    private router: Router,
    private dataBase : AngularFirestore
    ) { }

  Ingresar_service(email:string, password:string) {   
    return new Promise((resolve, rejects) =>{
      this.afAuth.signInWithEmailAndPassword(email, password).then(res =>{
        resolve(res);
      }).catch(error => rejects(error));
    });    
  }

  Registrar_service(nombre: string, email:string, password:string) { 
    return new Promise((resolve, rejects) =>{
      this.afAuth.createUserWithEmailAndPassword(email, password).then(res =>{
        const uid = res.user?.uid;
        var json = {
          name : nombre,
          email : email,
          uid : uid
        }

        localStorage.setItem('userCurrent', JSON.stringify(json));
        this.dataBase.collection('users').doc(uid).set(json);
        resolve(res);
      }).catch(error => rejects(error));
    });  
    
  }

  async Desloguearse_service() {     
    try{
      return await this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
      });
    }
    catch(error){
      console.log(error);
    }
  }

  getUsuario_service() { 
    return  this.afAuth.authState.pipe(first()).toPromise();
  }


}


