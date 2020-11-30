import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/AppUser';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { fade } from 'src/app/utilities/animations/animations';
import { TaskDetailsFinishDialogComponent } from './dialogs/task-details-finish-dialog/task-details-finish-dialog.component';

@Component({
  selector: 'app-task-details-finish-tab',
  templateUrl: './task-details-finish-tab.component.html',
  styleUrls: ['./task-details-finish-tab.component.css'],
  animations: [fade]
})
export class TaskDetailsFinishTabComponent implements OnInit, OnChanges {

  public conlusionForm: FormGroup;
  public emailForm: FormGroup;
  public emails = new Set();
  public appUsersColumns = ['fullName', 'email'];
  public appUserDataSource;

  @ViewChild(MatSort)
  public sort: MatSort;

  @Input()
  public appUsers: AppUser[] = [];

  @Output()
  public finishTaskEmitter = new EventEmitter();



  constructor(
    private formBuilder: FormBuilder,
    private httpApiService: HttpApiService,
    private matDialog: MatDialog
  ) {
    this.conlusionForm = this.formBuilder.group(
      {
        conclusion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]]
      }
    );

    this.emailForm = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]]
      }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.appUserDataSource = new MatTableDataSource(this.appUsers);
    this.appUserDataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  public addEmail(): void {
    if (this.emailForm.valid) {
      this.emails.add(this.emailForm.value.email);
      this.emailForm.reset();
    }
  }

  public addEmailFromExistingUsers(email: string) {
    this.emails.add(email);
  }

  public removeEmailFromList(email: string): void {
    this.emails.delete(email);
  }

  public finishTaskDialog(): void {
    const finishTaskDialogRef = this.matDialog.open(TaskDetailsFinishDialogComponent, { data: { emails: this.emails }, width: '600px' });
    finishTaskDialogRef.afterClosed()
      .subscribe(
        (response: string) => {
          if (response === 'true') {
            this.finishTaskEmitter.emit({ conclusion: this.conlusionForm.value.conclusion, emails: this.emails });
          }
        }
      );
  }
}
