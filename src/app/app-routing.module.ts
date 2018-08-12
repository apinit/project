import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DormitoryComponent } from './components/dormitory/dormitory.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { UploadfileComponent } from './components/dormitory/uploadfile/uploadfile.component';
import { DormitoryDetailComponent } from './components/dormitory/dormitory-detail/dormitory-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { EditComponent } from './components/dormitory/edit/edit.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: UserAdminComponent, canActivate: [AuthGuard] },
  { path: 'dorm', component: DormitoryComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadfileComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DormitoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
