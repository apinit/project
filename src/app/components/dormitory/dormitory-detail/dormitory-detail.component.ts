import { Component, OnInit } from '@angular/core';
import { DormService } from '../../../shared/dorm/dorm.service';
import { Dorm } from '../../../shared/dorm/dorm.model';
import { FormControl, FormControlDirective} from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@Component({
  selector: 'app-dormitory-detail',
  templateUrl: './dormitory-detail.component.html',
  styleUrls: ['./dormitory-detail.component.css']
})
export class DormitoryDetailComponent implements OnInit {

  address;
  name;
  price;
  tel;
  water;
  electric;

  dorms: Dorm;
  imageURLs = [];
  images = [];
  arr: Array<any>;

  constructor(
    public dormService: DormService,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.dorms = this.dormService.dormDetail;
   }

  ngOnInit() {
    if (this.dorms === null || this.dorms === undefined) {
      this.router.navigateByUrl('/')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      for (let i = 0; i < this.dorms.url.length; i++) {
        this.imageURLs.push(this.dorms.url[i]);
      }
    }
  }
}
