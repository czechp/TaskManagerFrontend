import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import {HomePageComponent} from './pages/home-page/home-page.component';
import {InputTextCustomComponent} from './components/input-text-custom/input-text-custom.component';
import {AdminPanelPageComponent} from './pages/admin-panel-page/admin-panel-page.component';
import {ForbiddenPageComponent} from './pages/errors/forbiden-page/forbidden-page.component';
import { SelectCustomComponent } from './components/select-custom/select-custom.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MaintenanceWorkersPageComponent } from './pages/maintenance-workers-page/maintenance-workers-page.component';
import { ReportBreakdownPageComponent } from './pages/report-breakdown-page/report-breakdown-page.component';
import { InputTextAreaCustomComponent } from './components/input-text-area-custom/input-text-area-custom.component';
import { BreakdownsPageComponent } from './pages/breakdowns-page/breakdowns-page.component';
import { BreakdownDetailPageComponent } from './pages/breakdown-detail-page/breakdown-detail-page.component';
import { BreakdownStatisticsComponent } from './pages/breakdowns-page/breakdown-statistics/breakdown-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftNavbarComponent,
    LoginPageComponent,
    TitleComponent,
    StatementComponent,
    RegisterPageComponent,
    HomePageComponent,
    InputTextCustomComponent,
    AdminPanelPageComponent,
    ForbiddenPageComponent,
    SelectCustomComponent,
    MessengerComponent,
    MaintenanceWorkersPageComponent,
    ReportBreakdownPageComponent,
    InputTextAreaCustomComponent,
    BreakdownsPageComponent,
    BreakdownDetailPageComponent,
    BreakdownStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
