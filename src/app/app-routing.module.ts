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

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent, canActivate: [AuthGuardService]},
  {path:'signup',component:UserComponent},
  {path:'one',component:MicroOneComponent, canActivate: [AuthGuardService]},
  {path:'two',component:MicroTowComponent, canActivate: [AuthGuardService]},
  {path:'add',component:AddProductComponent, canActivate: [AuthGuardService]},
  {path:'addAnnonce',component:AddannonceComponent, canActivate: [AuthGuardService]},
  {path:'ListeAnnonce',component:ListeAnnonceComponent, canActivate: [AuthGuardService]},

  { path: 'detailAnnonce/:id', component: DetailsAnnonceComponent, resolve: { annonce: AnnonceResolveService }, canActivate: [AuthGuardService] },

  {path:'sendemail',component:RequestPasswordResetComponent},
  {path:'updatepass',component:PasswordUpdateComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
