import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { KeycloakInitServiceService } from './service/keycloak-init-service.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MicroOneComponent } from './component/micro-one/micro-one.component';
import { MicroTowComponent } from './component/micro-tow/micro-tow.component';
import { UserComponent } from './component/user/user.component';
import {RequestInterceptorService} from "./service/request-interceptor.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { UserService } from './service/user.service';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { RxStompService, StompService } from '@stomp/ng2-stompjs';
import { AddannonceComponent } from './component/addannonce/addannonce.component';
import { ListeAnnonceComponent } from './component/liste-annonce/liste-annonce.component';
import { DragDirective } from './directive/drag-directive.directive';
import { ShowdialogComponent } from './component/showdialog/showdialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetailsAnnonceComponent } from './component/details-annonce/details-annonce.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    MicroOneComponent,
    MicroTowComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    PasswordUpdateComponent,
    RequestPasswordResetComponent,
    AddProductComponent,
    NotificationsComponent,
    AddannonceComponent,
    ListeAnnonceComponent,
    DragDirective,
    ShowdialogComponent,
    DetailsAnnonceComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule ,
    AppRoutingModule,KeycloakAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    RxStompService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 /* KeycloakInitServiceService,
    {
    provide: APP_INITIALIZER,
    useFactory: (keycloak: KeycloakInitServiceService) => () => keycloak.initKeycloak(),
    deps: [KeycloakInitServiceService],
    multi: true,
  },*/
