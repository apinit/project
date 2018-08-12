import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private loginService: LoginService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
       }
    });
  }
  logout() {
    this.loginService.logout();
    console.log('Logout Success');
   }

}
