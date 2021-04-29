import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User_Mensaje } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private dataBase: AngularFirestore) { }

  getDataQuery(collection: string) {
    return this.dataBase.collection(collection).snapshotChanges().pipe(map(rooms => {
      return rooms.map(item => {
        const data: any = item.payload.doc.data();
        data. id = item.payload.doc.id;
        return data;
      })
    }))
  }

  addData(collection: string, id: string, json: any) {
    this.dataBase.collection(collection).doc(id).set(json);
  }

  updateData(collection: string, id: string, json: any){
    this.dataBase.collection(collection).doc(id).update(json);
  }

   
  //********************Seccion chat***************************** */

  referencia_chatFB!: AngularFirestoreCollection<User_Mensaje>;

  private url_chat = '/chat';

  LeerTodo(): AngularFirestoreCollection<User_Mensaje> {
    this.referencia_chatFB = this.dataBase.collection(this.url_chat)
    return this.referencia_chatFB;
  }

  Crear(mensajes: User_Mensaje): any {
    this.referencia_chatFB = this.dataBase.collection(this.url_chat)
    return this.referencia_chatFB.add({ ...mensajes });
  }

  Borrar(id: string): Promise<void> {
    return this.referencia_chatFB.doc(id).delete();
  }

  Actualizar(id: string, dato: any): Promise<void> {
    return this.referencia_chatFB.doc(id).update(dato);
  }  
  //********************fin Seccion chat***************************** */
}
