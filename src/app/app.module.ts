import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { DormitoryComponent } from './components/dormitory/dormitory.component';
// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// forms & add
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { LoginService } from './shared/login/login.service';
import { AdminService } from './shared/user-admin/admin.service';
import { DormService } from './shared/dorm/dorm.service';

import { Ng2ImgMaxModule } from 'ng2-img-max';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';


import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UploadfileComponent } from './components/dormitory/uploadfile/uploadfile.component';
import { DormitoryDetailComponent } from './components/dormitory/dormitory-detail/dormitory-detail.component';

import { CarouselModule } from 'ngx-bootstrap';
import { EditComponent } from './components/dormitory/edit/edit.component';

@NgModule({
  declarations: [
    EditComponent,
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    UserAdminComponent,
    DormitoryComponent,
    UploadfileComponent,
    DormitoryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2ImgMaxModule,
    CarouselModule.forRoot()
  ],
  providers: [AuthGuard, LoginService, AdminService, DormService, ToastrService, Ng2ImgMaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
