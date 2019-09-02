import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {error} from 'util';

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
              alert('Bienvenido');
            },
            err => {
              reject(err);
              alert('Usuario o contraseña incorrecto');
            });
      });
  }

  logout() {
    return this.afsAuth.auth.signOut();
  }

}
