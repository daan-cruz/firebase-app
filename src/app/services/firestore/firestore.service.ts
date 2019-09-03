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
  // Obtiene todos los gatos
  public getUsers() {
    return this.firestore.collection('user').snapshotChanges();
  }
  // Actualiza un gato
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('user').doc(documentId).set(data);
  }

  public deleteUser(documentId: string) {
     if (confirm('¿Está seguro que desea eliminar')) {
       this.firestore.doc('user' + documentId).delete();
     }
  }
}
