import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {LeftNavbarComponent} from './components/left-navbar/left-navbar.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TitleComponent} from './components/title/title.component';
import {StatementComponent} from './components/statement/statement.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {HttpInterceptorService} from './services/security/httpInterceptor/http-interceptor.service';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftNavbarComponent,
    LoginPageComponent,
    TitleComponent,
    StatementComponent,
    RegisterPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
