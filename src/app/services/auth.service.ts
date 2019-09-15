import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {error} from 'util';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) {
  }

  login(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.afsAuth.auth.signInWithEmailAndPassword(email, password)
          .then(userData => {
              resolve(userData);
            },
            err => {
              reject(err);
            });
      });
  }

  logout() {
    return this.afsAuth.auth.signOut();
  }
  loginAnoni(){
    return new Promise(
      (resolve, reject) => {
        this.afsAuth.auth.signInAnonymously()
          .then(userData => {
              resolve(userData);
            },
            err => {
              reject(err);
            });
      });
  }


  getUserAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
