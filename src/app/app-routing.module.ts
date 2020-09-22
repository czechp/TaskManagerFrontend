import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPanelPageComponent} from './pages/admin-panel-page/admin-panel-page.component';
import {LoggedGuardService} from './services/security/guards/logged-guard.service';


const routes: Routes = [
  {path: 'register', component: RegisterPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', component: HomePageComponent, canActivate: [LoggedGuardService]},
  {path: 'admin-panel', component: AdminPanelPageComponent, canActivate: [LoggedGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
