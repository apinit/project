import { Component, OnInit } from '@angular/core';
import { Login } from '../../shared/login/login.model';
import { LoginService } from '../../shared/login/login.service';
import { FormBuilder, FormControl, FormArrayName, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin;

  constructor(
    public service: LoginService,
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createFormLogin();
  }

  loginSubmit() {
    this.service.login(this.service.selectedModel)
    .then((res) => {
      this.router.navigate(['']);
      console.log('Login Success');
      this.resetForm();
    })
    .catch((err) => {
      console.log(err.code);
      if (err.code === 'auth/user-not-found') {
        this.toastr.error('กรุณาลองใหม่อีกครั้ง', 'อีเมลล์ไม่ถูกต้อง !');
      } else if (err.code === 'auth/wrong-password') {
        this.toastr.error('กรุณาลองใหม่อีกครั้ง', 'รหัสผ่านไม่ถูกต้อง !');
      } else {
        this.toastr.error(err);
      }
     });
  }
  resetForm() {
    if (this.formLogin != null) {
      this.formLogin.reset();
    }
  }

  createFormLogin() {
    this.formLogin = this.fb.group({
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
  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }
}
