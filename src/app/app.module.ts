import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { RxStompService, StompService } from '@stomp/ng2-stompjs';
import { AddannonceComponent } from './component/addannonce/addannonce.component';
import { ListeAnnonceComponent } from './component/liste-annonce/liste-annonce.component';
import { DragDirective } from './directive/drag-directive.directive';
import { ShowdialogComponent } from './component/showdialog/showdialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetailsAnnonceComponent } from './component/details-annonce/details-annonce.component';
import { MatCardModule } from '@angular/material/card';
import { NotificationComponent } from './component/notification/notification.component';
import { ReservationCalendarComponent } from './component/reservation-calendar/reservation-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MesannoncesComponent } from './mesannonces/mesannonces.component';
import { Step1Component } from './component/AjouterAnnonce/step1/step1.component';
import { Step2Component } from './component/AjouterAnnonce/step2/step2.component';
import { Step3Component } from './component/AjouterAnnonce/step3/step3.component';
import { Step4Component } from './component/AjouterAnnonce/step4/step4.component';
import { MapannoncesComponent } from './component/mapannonces/mapannonces.component';
import { VerifyemailComponent } from './component/verifyemail/verifyemail.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

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

    AddannonceComponent,
    ListeAnnonceComponent,
    DragDirective,
    ShowdialogComponent,
    DetailsAnnonceComponent,
    NotificationComponent,
    ReservationCalendarComponent,
    HeaderComponent,
    FooterComponent,
    MesannoncesComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    MapannoncesComponent,
    VerifyemailComponent,
    ResetPasswordComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],

  imports: [
    BrowserModule,
    MatGridListModule ,
    AppRoutingModule,KeycloakAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    FullCalendarModule
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
