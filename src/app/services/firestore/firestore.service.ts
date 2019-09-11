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

  public createMunicipalities(data) {
    return this.firestore.collection('municipalities').add(data);
  }

  public getMunicipalities() {
    return this.firestore.collection('municipalities').snapshotChanges();
  }

  public updateMunicipalities(municipalities, data: any) {
    return this.firestore.collection('municipalities').doc(municipalities.id).set(data);
  }

  public deleteMunicipalities(municipalities) {
   return  this.firestore.collection('municipalities').doc(municipalities.id).delete();
  }
}
