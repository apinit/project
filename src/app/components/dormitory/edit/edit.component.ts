import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArrayName, FormGroup, NgForm, Validators, NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { DormService } from '../../../shared/dorm/dorm.service';
import { Dorm } from '../../../shared/dorm/dorm.model';
import { ToastrService } from 'ngx-toastr';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selectedModel: Dorm = new Dorm(); // use in html
  dormForm;

  // new
  dorm: Dorm;
  editState = false;

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
    if (this.service.editState === true) {
      this.forEdit();
      this.editState = this.service.editState;
    } else {
      this.router.navigateByUrl('/')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
     }
  }
  reset() {
    this.dormForm.reset();
   }

  forEdit() {
    this.dorm = this.service.toedit;
    this.selectedModel = Object.assign({}, this.dorm);
  }
  cancel() {
    this.router.navigate(['/'])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
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
    if (this.selectedModel.dormitoryID != null || this.selectedModel.dormitoryID !== undefined) {
      this.service.updateDorm(this.selectedModel);
      this.editState = false;
     }
    this.resetForm();
    this.service.resetStateEdit();
  }

  // factdorm
  checkCarpark() {
    this.selectedModel.factdorm.carparking.selected = !this.selectedModel.factdorm.carparking.selected;
  }
  checkCamera() {
    this.selectedModel.factdorm.camera.selected = !this.selectedModel.factdorm.camera.selected;
  }
  checkKeycard() {
    this.selectedModel.factdorm.keycard.selected = !this.selectedModel.factdorm.keycard.selected;
  }
  checkWashing() {
    this.selectedModel.factdorm.washing.selected = !this.selectedModel.factdorm.washing.selected;
  }

  // factroom
  checkAir() {
    this.selectedModel.factroom.air.selected = !this.selectedModel.factroom.air.selected;
  }
  checkInternet() {
    this.selectedModel.factroom.internet.selected = !this.selectedModel.factroom.internet.selected;
  }
  checkCabletv() {
    this.selectedModel.factroom.cabletv.selected = !this.selectedModel.factroom.cabletv.selected;
  }
  checkDesk() {
    this.selectedModel.factroom.desk.selected = !this.selectedModel.factroom.desk.selected;
  }
  checkWardrobe() {
    this.selectedModel.factroom.wardrobe.selected = !this.selectedModel.factroom.wardrobe.selected;
  }
  checkBed() {
    this.selectedModel.factroom.bed.selected = !this.selectedModel.factroom.bed.selected;
  }
  checkRefrigerator() {
    this.selectedModel.factroom.refrigerator.selected = !this.selectedModel.factroom.refrigerator.selected;
  }
  checkWaterheater() {
    this.selectedModel.factroom.waterheater.selected = !this.selectedModel.factroom.waterheater.selected;
  }
  checkFan() {
    this.selectedModel.factroom.fan.selected = !this.selectedModel.factroom.fan.selected;
  }

  resetForm() {
    if (this.dormForm != null) {
      this.dormForm.reset();
    }
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
