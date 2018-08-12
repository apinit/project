import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Dorm } from './dorm.model';
import * as firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DormService {

  currentId;
  keys;
  selectedModel: Dorm = new Dorm();
  dbRef: AngularFireList<any>;

  dormDetail: Dorm;
  imageLen;

  // new
  editState;
  toedit: Dorm;
  forResetForm = false;
  stateResetForm = false;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.dbRef = db.list('Dormitorys');
  }

  getDorm() {
    this.dbRef = this.db.list('Dormitorys');
    return this.dbRef;
  }

  forDetails(dorm: Dorm) {
    this.dormDetail = dorm;
  }

  // reset state of edit
  resetStateEdit() {
    this.editState = false;
    console.log(this.editState);
   }

  // for edit data
  toEdit(dorm: Dorm, editState) {
    console.log(dorm, editState);
    this.toedit = dorm;
    this.editState = editState;
    this.router.navigate(['/edit'])
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err, 'Error navigate');
    });
   }

  // for image uplaod
  getCurrentId(key: string) {
    this.currentId = key;
   }
  // for image uplaod

  insertDorm(dorm: Dorm) {
    this.dbRef.push(dorm)
      .then((data) => {
        console.log(data);
        this.keys = data.key;
        this.getCurrentId(data.key);

        this.preventError(data.key);
        this.router.navigate(['/upload']);
       });
    console.log('Create Dormitory Success');
  }

  preventError(key: string) {
    // tslint:disable-next-line:max-line-length
    const URL = 'https://firebasestorage.googleapis.com/v0/b/dorm-d3945.appspot.com/o/setURL%20**does%20not%20for%20delete%2FSET.jpg?alt=media&token=72f09a90-9d73-482c-9c70-4ac00d57a36c';
    firebase.database().ref('Dormitorys/' + key + '/url/' + 0).set(URL);
    firebase.database().ref('Dormitorys/' + this.currentId + '/url/length/').set(1);
  }

  updateDorm(user: Dorm) {
    this.dbRef.update(user.dormitoryID, {
      name: user.name,
      price: user.price,
      factroom: user.factroom,
      factdorm: user.factdorm,
      address: user.address,
      tel: user.tel,
      water: user.water,
      electric: user.electric
    })
      .then((res) => {
        this.selectedModel.dormitoryID = null;
        this.resetStateEdit();
        this.toastr.success('Update data successfull');
        this.router.navigateByUrl('/')
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteDorm(dormitoryID: string) {
    this.dbRef.remove(dormitoryID)
      .then((res) => {
        console.log('Remove Item Success');
        this.toastr.success('ลบข้อมูลสำเร็จ');
      });

  }

  // upload image ---------------------------------------------------------------
  getImage(files = []) {
    for (let i = 0; i < files.length; i++) {
      this.pushImage(files[i], i);
    }
    this.imageLen = files.length; // for set in DB
   }
  pushImage(files: File, i) {
    const store = firebase.storage().ref();
    const uploadTask = store.child(this.currentId + '/' + files.name).put(files);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {

      },
      (error) => {
        console.log(error);
      },
      () => {
        const url = uploadTask.snapshot.downloadURL;
        this.updateURL(url, i);
      }
    );
    console.log('Upload image success');
  }


  updateURL(url: string, i) {
    firebase.database().ref('Dormitorys/' + this.currentId + '/url/' + i).set(url); // + '/image/url/'
    if (this.imageLen - 1 === i) {
      firebase.database().ref('Dormitorys/' + this.currentId + '/url/length/').set(this.imageLen);
      this.resetStateEdit();
      this.selectedModel.dormitoryID = null;
      this.stateResetForm = true;
     }
  }
  // upload image ---------------------------------------------------------------

}
