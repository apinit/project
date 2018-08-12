import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Admin } from '../user-admin/admin.model';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AdminService {

  selectedModel: Admin = new Admin();
  authState: any = null;
  currentId;
  dbRef: AngularFireList<any>;
  userIds;
  stateResetForm = false;

  regisSuccess = false;

  constructor(
    private db: AngularFireDatabase,
    private auths: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.auths.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }
  signup(user: Admin) {
    this.auths.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((value) => {
        console.log(value);
        this.insertData(user, value);
        console.log('Auth Success');
      }).catch((err) => {
        console.log(err);
        this.toastr.error(err.message);
      });
  }

  insertData(user, value) {
    console.log('Receive ', user, value);
    firebase.database().ref('User/' + value.uid).set({
      fullname: user.fullname,
      email: user.email
    })
      .then((res) => {
        this.toastr.success('Registering successful');
        this.forStateReset();
      })
      .catch((error) => {
      console.log(error);
      });
  }

  forStateReset() {
    this.stateResetForm = true;
    console.log(this.stateResetForm);
  }

  getUser() {
    this.dbRef = this.db.list('User');
    return this.dbRef;
  }
  getCurrentId(uid: string) {
    this.userIds = uid;
  }
}
