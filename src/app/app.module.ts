import { APP_INITIALIZER, NgModule ,ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './rooms/container/container.component';
import { EmployeeComponent } from './rooms/employee/employee.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './rooms/AppConfig/appconfig.service';
import { RequestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotfoundComponent } from './notfound/notfound.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HoverDirective } from './hover.directive';
import { EmailvaildatorDirective } from './emailvaildator/emailvaildator.directive';
import { RoomsModule } from './rooms/rooms.module';
import { HeaderModule } from './rooms/header/header.module';
import { RouteConfigToken } from './services/routeConfig.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from './errorhandler.service';
import { StyleLoaderService } from './lazy-css.component';

function ininFactory(initService:InitService){
  // return initService.init();
  return () => initService.init();
}

function routerFactory(service:StyleLoaderService){
  return () => service.getRouter();
}


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    EmployeeComponent,
    AppNavComponent,
    NotfoundComponent,
    LoginComponent,
    HoverDirective,
    EmailvaildatorDirective,
  ],
  imports: [
    BrowserModule,
    // RoomsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    // HeaderModule,    
    MatDatepickerModule,
    MatSnackBarModule,
    RoomsModule
  ],
  providers: [
    {
      provide:APP_SERVICE_CONFIG,
      useValue:APP_CONFIG
    },
    {
      provide:RouteConfigToken,
      useValue:{title:'Home'}
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RequestInterceptor,
      multi:true
    },
    {
      provide:APP_INITIALIZER,
      useFactory:ininFactory,
      deps:[InitService],
      multi:true
    },
    {
      provide:APP_INITIALIZER,
      useFactory:routerFactory,
      deps:[StyleLoaderService],
      multi:true
    },
    {
      provide:ErrorHandler,
      useClass:GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
