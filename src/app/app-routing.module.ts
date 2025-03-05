import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MicroOneComponent} from "./component/micro-one/micro-one.component";
import {MicroTowComponent} from "./component/micro-tow/micro-tow.component";
import {UserComponent} from "./component/user/user.component";
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { AuthGuardService } from './service/auth-guard.service';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { AddannonceComponent } from './component/addannonce/addannonce.component';
import { ListeAnnonceComponent } from './component/liste-annonce/liste-annonce.component';
import { DetailsAnnonceComponent } from './component/details-annonce/details-annonce.component';
import { Annonce } from './component/model/Annonce';
import { AnnonceResolveService } from './service/annonce-resolve.service';
import { ReservationCalendarComponent } from './component/reservation-calendar/reservation-calendar.component';
import { NotificationComponent } from './component/notification/notification.component';
import { HeaderComponent } from './header/header.component';
import { Step1Component } from './component/AjouterAnnonce/step1/step1.component';
import { Step2Component } from './component/AjouterAnnonce/step2/step2.component';
import { Step3Component } from './component/AjouterAnnonce/step3/step3.component';
import { Step4Component } from './component/AjouterAnnonce/step4/step4.component';
import { MapannoncesComponent } from './component/mapannonces/mapannonces.component';
import { VerifyemailComponent } from './component/verifyemail/verifyemail.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderComponent},

  {path:'home',component:HomeComponent, canActivate: [AuthGuardService]},
  {path:'signup',component:UserComponent},
  {path:'one',component:MicroOneComponent, canActivate: [AuthGuardService]},
  {path:'two',component:MicroTowComponent, canActivate: [AuthGuardService]},
  {path:'add',component:AddProductComponent, canActivate: [AuthGuardService]},
  {path:'addAnnonce',component:AddannonceComponent, canActivate: [AuthGuardService]},
  {path:'ListeAnnonce',component:ListeAnnonceComponent, canActivate: [AuthGuardService]},
  {path:'step1',component:Step1Component, canActivate: [AuthGuardService]},
  {path:'step2',component:Step2Component, canActivate: [AuthGuardService]},
  {path:'step3',component:Step3Component, canActivate: [AuthGuardService]},
  {path:'step4',component:Step4Component, canActivate: [AuthGuardService]},
  {path:'map',component:MapannoncesComponent, canActivate: [AuthGuardService]},
  {path:'verify-email',component:VerifyemailComponent},
  {path:'reset-password',component:ResetPasswordComponent},



  { path: 'detailAnnonce/:id', component: DetailsAnnonceComponent, resolve: { annonce: AnnonceResolveService }, canActivate: [AuthGuardService] },

  {path:'sendemail',component:RequestPasswordResetComponent},
  {path:'updatepass',component:PasswordUpdateComponent},
  {path:'calendar',component:ReservationCalendarComponent},
  {path:'notif',component:NotificationComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
