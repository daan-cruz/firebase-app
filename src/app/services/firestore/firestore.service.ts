import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

   constructor(
    private firestore: AngularFirestore
  ) {}
  // Crea un nuevo gato
  public createUser(data: {nombre: string, apellido: string, correo: string, edad: string}) {
    return this.firestore.collection('user').add(data);
  }
  // Obtiene un gato
  public getUser(documentId: string) {
    return this.firestore.collection('user').doc(documentId).snapshotChanges();
  }

  public getUsers() {
    return this.firestore.collection('user').snapshotChanges();
  }
  // update user
  public updateUser(user, data: any) {
    return this.firestore.collection('user').doc(user.id).set(data);
  }

  public deleteUser(user) {
   return  this.firestore.collection('user').doc(user.id).delete();
  }
}