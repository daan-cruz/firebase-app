import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) {
  }

  public createMunicipalities(data) {
    return this.firestore.collection('municipalities').add(data);
  }

  public getMunicipalities(derrumbe, deslave, incendio, inundacion, sismo, vocanes) {
    return this.firestore.collection('municipalities', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (derrumbe) {
          query = query.where('derrumbesCheck', '==', true);
        }
        if (deslave) {
          query = query.where('deslaveCheck', '==', true);
        }
        if (incendio) {
          query = query.where('incendioCheck', '==', true);
        }
        if (inundacion) {
          query = query.where('inundacionCheck', '==', true);
        }
        if (sismo) {
          query = query.where('deslaveCheck', '==', true);
        }
        if (vocanes) {
          query = query.where('volcanesCheck', '==', true);
        }
        return query.orderBy('IGECEM', 'desc');
      }
    ).snapshotChanges();
  }

  public updateMunicipalities(municipalities, data: any) {
    return this.firestore.collection('municipalities').doc(municipalities.id).set(data);
  }

  public deleteMunicipalities(municipalities) {
    return this.firestore.collection('municipalities').doc(municipalities.id).delete();
  }
}
