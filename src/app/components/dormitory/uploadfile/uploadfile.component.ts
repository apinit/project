import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { DormService } from '../../../shared/dorm/dorm.service';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  isBeforeResize: FileList;
  isResized: File;
  imagePre = [];
  intransform: File; // intransForm
  images: File;

  imageList = [];
  checkMaxSelected;

  imagePreview: string;

  // this swapp vari
  first;
  second;
  temp;

  constructor(
    public service: DormService,
    private ng2up: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    public toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  detectedFiles(e) {
    this.isBeforeResize = e.target.files;

    if (this.isBeforeResize.length > 5) {
      // alert('Image max is 5 , try again');
      this.toastr.error('เลือกรูปภาพได้ไม่เกิน 5 รูปเท่านั้น');
      this.checkMaxSelected = this.isBeforeResize.length;
    } else {
      this.checkMaxSelected = this.isBeforeResize.length;
      this.first = this.isBeforeResize.length;

      // clear Array
      if (this.first !== 0) {
        if (this.first !== this.second) {
          this.imagePre = []; // reset Array
        }

        this.second = this.first;
      }
      // console.log(this.isBeforeResize);
      for (let i = 0; i < this.isBeforeResize.length; i++) {
        this.transForm(this.isBeforeResize.item(i), i);
      }
    }
  }

  transForm(file: File, i) {
    this.intransform = file;
    // console.log(this.intransform + ' =- ' + i);
    this.resize(this.intransform, i);
   }

  resize(files: File, i) {
    this.ng2up.resizeImage(files, 500, 400).subscribe(res => {
      // console.log(res);
      this.images = new File([res], res.name, res);
      this.imageList[i] = this.images;
      // console.log(this.images, i);
      this.getImagePreview(this.images, i);
     });
  }

  getImagePreview(file: File, i) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imagePre[i] = this.imagePreview;
    };
  }
  sendImagePush() {
    // console.log(this.imageList);
    if (this.checkMaxSelected > 5) {
      this.toastr.error('เลือกรูปภาพได้ไม่เกิน 5 รูปเท่านั้น');
    } else {
      this.service.getImage(this.imageList);
      this.toastr.success('Upload image successful');
      this.router.navigate(['/']);
    }
  }
}
