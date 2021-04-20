import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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
}
