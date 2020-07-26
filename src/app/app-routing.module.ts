import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { UserMgmtComponent } from './users/user-mgmt/user-mgmt.component';
import { AuthGuard } from "./guard/auth.guard";//"../../guard/auth.guard";
import { ChildComponent } from './child/child.component';

const routes: Routes = [  
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'child', component: ChildComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
  { path: 'user', component:  UserMgmtComponent, canActivate: [AuthGuard]},   
  { path: '**', component: LoginComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }