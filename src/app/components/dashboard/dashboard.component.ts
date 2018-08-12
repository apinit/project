import { Component, OnInit } from '@angular/core';
import { Dorm } from '../../shared/dorm/dorm.model';
import { DormService } from '../../shared/dorm/dorm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dorm: Dorm[];
  checklen = [];

  // new
  editState = false;
  resetStateEdit;

  constructor(
    public service: DormService,
    public router: Router
  ) { }

  ngOnInit() {
    const x = this.service.getDorm();
    x.snapshotChanges().subscribe((val) => {
      this.dorm = [];
      val.forEach(element => {
        const y = element.payload.toJSON();
        y['dormitoryID'] = element.key;
        this.dorm.push(y as Dorm);
        // this.checklen = this.dorm;
       });
    });
  }

  onEdit(user: Dorm) {
    this.editState = true;
    this.service.toEdit(user, this.editState);
    this.service.getCurrentId(user.dormitoryID); // for upload image
  }

  onDelete(key: string) {
      this.service.deleteDorm(key);
  }

  toUpload(dorm: Dorm) {
    this.service.getCurrentId(dorm.dormitoryID);
    this.router.navigate(['/upload']);
  }

  forDetail(dorm) {
    this.service.forDetails(dorm);
  }
}
