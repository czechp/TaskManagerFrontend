import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { LoggedGuardService } from './services/security/guards/logged-guard.service';
import { ForbiddenPageComponent } from './pages/errors/forbiden-page/forbidden-page.component';
import { AdminGuardService } from './services/security/guards/admin-guard.service';
import { MaintenanceWorkersPageComponent } from './pages/maintenance-workers-page/maintenance-workers-page.component';
import { ReportBreakdownPageComponent } from './pages/report-breakdown-page/report-breakdown-page.component';
import { BreakdownsPageComponent } from './pages/breakdowns-page/breakdowns-page.component';
import { BreakdownDetailPageComponent } from './pages/breakdown-detail-page/breakdown-detail-page.component';


const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forbidden', component: ForbiddenPageComponent },
  { path: '', component: HomePageComponent, canActivate: [LoggedGuardService] },
  { path: 'admin-panel', component: AdminPanelPageComponent, canActivate: [LoggedGuardService, AdminGuardService] },
  { path: 'maintenance-wrokers', component: MaintenanceWorkersPageComponent, canActivate: [LoggedGuardService] },
  {path: 'report-breakdown', component: ReportBreakdownPageComponent, canActivate: [LoggedGuardService]},
  {path: 'breakdowns', component: BreakdownsPageComponent, canActivate: [LoggedGuardService]},
  {path: 'breakdown-detail/:id', component: BreakdownDetailPageComponent, canActivate:[LoggedGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
