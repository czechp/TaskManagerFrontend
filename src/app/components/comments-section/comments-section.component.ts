import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskComment } from 'src/app/models/TaskComment';
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';
import { fade } from 'src/app/utilities/animations/animations';
import { DeleteCommentDialogComponent } from './dialogs/delete-comment-dialog/delete-comment-dialog.component';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css'],
  animations: [fade]
})
export class CommentsSectionComponent implements OnInit {

  public commentForm: FormGroup;

  @Input()
  public comments: Comment[];

  @Output()
  public addCommentEmitter = new EventEmitter();

  @Output()
  public removeCommentEmitter = new EventEmitter();



  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private matDialog: MatDialog
  ) {
    this.commentForm = this.formBuilder.group(
      {
        content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]]
      }
    )
  }

  ngOnInit(): void {
  }

  public addComment(): void {
    if (this.commentForm.valid) {
      this.addCommentEmitter.emit(this.commentForm.value.content);
    }
  }

  public isCommentOwner(owner: string) {
    return this.authorizationService.getRole() === 'ADMIN' || this.authorizationService.getUsername() === owner;
  }

  public removeCommentDialog(commentId: number): void {
    const removeDailogRef = this.matDialog.open(
      DeleteCommentDialogComponent,
      {
        data: {},
        width: '600px',
      });

    removeDailogRef.afterClosed()
      .subscribe(
        (response: any) => {
          if (response === 'true') {
            this.removeDialog(commentId);
          }
        }
      )
  }

  private removeDialog(commentId: number): void {
    this.removeCommentEmitter.emit(commentId);
  }

}
