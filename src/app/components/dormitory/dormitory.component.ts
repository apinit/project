import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArrayName, FormGroup, NgForm, Validators, NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { DormService } from '../../shared/dorm/dorm.service';
import { Dorm } from '../../shared/dorm/dorm.model';
import { ToastrService } from 'ngx-toastr';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dormitory',
  templateUrl: './dormitory.component.html',
  styleUrls: ['./dormitory.component.css']
})
export class DormitoryComponent implements OnInit {

  selectedModel: Dorm = new Dorm();
  dormForm: FormGroup;
  state = false;
  selectedFiles: FileList;
  currentUpload: Dorm;

  // image upload
  uploadedImage: File;
  imagePreview: string;
  stateTo = false;
  stateBack = false;
  image;

  // new
  dorm: Dorm;
  editState = false;
  stateReset = false;


  constructor(
    public service: DormService,
    private fb: FormBuilder,
    public router: Router,
    public toastr: ToastrService,
    private ngx: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.createForm();
  }
  reset() {
    this.dormForm.reset();
  }

  createForm() {
    this.dormForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', Validators.required],
      price: ['', Validators.required],
      water: ['', Validators.required],
      electric: ['', Validators.required],
      factdorm: [''],
      factroom: ['']
    });
  }
  onSubmit() {
    if (this.service.selectedModel.dormitoryID == null || this.service.selectedModel.dormitoryID === undefined) {
      this.service.insertDorm(this.service.selectedModel);
    }
    this.resetForm();
    this.service.resetStateEdit();
  }
  toUpload() {
    this.router.navigate(['/upload'])
      .then((res) => {
        console.log(res);
        this.onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
    this.stateReset = true;
  }

  resetForm() {
    if (this.dormForm != null) {
      this.dormForm.reset();
      console.log('Reset');
    }
  }

  // factdorm
  checkCarpark() {
    this.service.selectedModel.factdorm.carparking.selected = !this.service.selectedModel.factdorm.carparking.selected;
  }
  checkCamera() {
    this.service.selectedModel.factdorm.camera.selected = !this.service.selectedModel.factdorm.camera.selected;
  }
  checkKeycard() {
    this.service.selectedModel.factdorm.keycard.selected = !this.service.selectedModel.factdorm.keycard.selected;
  }
  checkWashing() {
    this.service.selectedModel.factdorm.washing.selected = !this.service.selectedModel.factdorm.washing.selected;
  }

  // factroom
  checkAir() {
    this.service.selectedModel.factroom.air.selected = !this.service.selectedModel.factroom.air.selected;
  }
  checkInternet() {
    this.service.selectedModel.factroom.internet.selected = !this.service.selectedModel.factroom.internet.selected;
  }
  checkCabletv() {
    this.service.selectedModel.factroom.cabletv.selected = !this.service.selectedModel.factroom.cabletv.selected;
  }
  checkDesk() {
    this.service.selectedModel.factroom.desk.selected = !this.service.selectedModel.factroom.desk.selected;
  }
  checkWardrobe() {
    this.service.selectedModel.factroom.wardrobe.selected = !this.service.selectedModel.factroom.wardrobe.selected;
  }
  checkBed() {
    this.service.selectedModel.factroom.bed.selected = !this.service.selectedModel.factroom.bed.selected;
  }
  checkRefrigerator() {
    this.service.selectedModel.factroom.refrigerator.selected = !this.service.selectedModel.factroom.refrigerator.selected;
  }
  checkWaterheater() {
    this.service.selectedModel.factroom.waterheater.selected = !this.service.selectedModel.factroom.waterheater.selected;
  }
  checkFan() {
    this.service.selectedModel.factroom.fan.selected = !this.service.selectedModel.factroom.fan.selected;
  }


  get name() {
    return this.dormForm.get('name');
  }
  get price() {
    return this.dormForm.get('price');
  }
  get address() {
    return this.dormForm.get('address');
  }
  get tel() {
    return this.dormForm.get('tel');
  }
  get water() {
    return this.dormForm.get('water');
  }
  get electric() {
    return this.dormForm.get('electric');
  }
  get factdorm() {
    return this.dormForm.get('factdorm');
  }
  get factroom() {
    return this.dormForm.get('factroom');
  }

}
