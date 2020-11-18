import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {LeftNavbarComponent} from './components/left-navbar/left-navbar.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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


import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs'
import {MatIconModule} from '@angular/material/icon'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AddTaskPageComponent } from './pages/add-task-page/add-task-page.component';
import { AddTaskGeneralComponent } from './pages/add-task-page/components/add-task-general/add-task-general.component';
import { AddTaskUsersComponent } from './pages/add-task-page/components/add-task-users/add-task-users.component';
import { AddTaskUsersDialogAddComponent } from './pages/add-task-page/components/add-task-users/dialogs/add-task-users-dialog-add/add-task-users-dialog-add.component';
import { AddTaskGoalsComponent } from './pages/add-task-page/components/add-task-goals/add-task-goals.component';
import { AddTaskSubtasksComponent } from './pages/add-task-page/components/add-task-subtasks/add-task-subtasks.component';
import { TaskDetailsPageComponent } from './pages/task-details-page/task-details-page.component';
import { TaskDetailsGeneralTabComponent } from './pages/task-details-page/components/task-details-general-tab/task-details-general-tab.component';
import { TaskDetailsUsersTabComponent } from './pages/task-details-page/components/task-details-users-tab/task-details-users-tab.component';
import { TaskDetailsDeleteUserDialogComponent } from './pages/task-details-page/components/task-details-users-tab/dialogs/task-details-delete-user-dialog/task-details-delete-user-dialog.component';
import { TaskDetailsGoalsTabComponent } from './pages/task-details-page/components/task-details-goals-tab/task-details-goals-tab.component';
import { TaskDetailsDeleteGoalDialogComponent } from './pages/task-details-page/components/task-details-goals-tab/dialogs/task-details-delete-goal-dialog/task-details-delete-goal-dialog.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TaskDetailsSubtasksTabComponent } from './pages/task-details-page/components/task-details-subtasks-tab/task-details-subtasks-tab.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { TaskDetailsDeleteSubtaskDialogComponent } from './pages/task-details-page/components/task-details-subtasks-tab/dialogs/task-details-delete-subtask-dialog/task-details-delete-subtask-dialog.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';

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
    AddTaskPageComponent,
    AddTaskGeneralComponent,
    AddTaskUsersComponent,
    AddTaskUsersDialogAddComponent,
    AddTaskGoalsComponent,
    AddTaskSubtasksComponent,
    TaskDetailsPageComponent,
    TaskDetailsGeneralTabComponent,
    TaskDetailsUsersTabComponent,
    TaskDetailsDeleteUserDialogComponent,
    TaskDetailsGoalsTabComponent,
    TaskDetailsDeleteGoalDialogComponent,
    ProgressBarComponent,
    TaskDetailsSubtasksTabComponent,
    ProgressSpinnerComponent,
    TaskDetailsDeleteSubtaskDialogComponent,
    CommentsSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
