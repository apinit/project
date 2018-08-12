import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Login } from './login.model';
@Injectable()
export class LoginService {

  selectedModel: Login = new Login();
  authState: any = null;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  // login(user: Login) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  //       .then(userData =>
  //         resolve(userData),
  //       err => reject(err));
  //   });
  // }
  login(user: Login) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((datas) => {
          resolve(datas);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }
  deleteUser(uid: string) {
    console.log(uid);
   }
  logout() {
    return this.afAuth.auth.signOut().then(val => {
      this.router.navigate(['/login']);
    }
    );
  }
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
   }
}
