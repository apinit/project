import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/user-admin/admin.service';
import { FormBuilder, FormControl, FormArrayName, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../shared/user-admin/admin.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  title = 'user-admin';
  formAdmin;
  data: Admin[];

  constructor(
    public service: AdminService,
    public router: Router,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createFormAdmin();
    const x = this.service.getUser();
    x.snapshotChanges().subscribe((d) => {
      this.data = [];
      d.forEach(element => {
        const y = element.payload.toJSON();
        y['userId'] = element.key;
        this.data.push(y as Admin);
      });
    });
  }

  onSubmit() {
    this.service.signup(this.service.selectedModel);
  }
  createFormAdmin() {
    this.formAdmin = this.fb.group({
      fullname: ['', [
        Validators.required
      ]],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });
  }

  resetForm() {
    this.formAdmin.reset();
  }



  get fullname() { return this.formAdmin.get('fullname'); }
  get email() { return this.formAdmin.get('email'); }
  get password() { return this.formAdmin.get('password'); }
}
