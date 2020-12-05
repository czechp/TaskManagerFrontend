import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Query,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatExpansionPanel } from "@angular/material/expansion";
import { Announcement } from "src/app/models/Announcement";
import { AuthorizationService } from "src/app/services/security/authorizationService/authorization.service";
import { RemoveAnnouncementDialogComponent } from "./dialog/remove-announcement-dialog/remove-announcement-dialog/remove-announcement-dialog.component";

@Component({
  selector: "app-announcements-list",
  templateUrl: "./announcements-list.component.html",
  styleUrls: ["./announcements-list.component.css"],
})
export class AnnouncementsListComponent implements OnInit, AfterViewInit {
  @Input()
  public announcements: Announcement[] = [];

  @Output()
  public addCommentEmitter = new EventEmitter();

  @Output()
  public removeCommentEmitter = new EventEmitter();

  @Output()
  public removeAnnouncementEmitter = new EventEmitter();

  @ViewChildren("announceExpensionPanel")
  public announcementPanels: QueryList<MatExpansionPanel>;

  constructor(
    private authorizationService: AuthorizationService,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.announcementPanels.changes.subscribe(() => {
      if (this.announcementPanels.length > 0)
        setTimeout(() => this.announcementPanels.first.open(), 100);
    });
  }

  ngOnInit(): void {}

  public addComment(announcementId: number, commentContent: string): void {
    this.addCommentEmitter.emit([announcementId, commentContent]);
  }

  public isOwner(ownerUsername: string): boolean {
    const isOwner = ownerUsername === this.authorizationService.getUsername();
    const isAdmin = this.authorizationService.getRole() === "ADMIN";
    return isOwner || isAdmin;
  }

  public deleteAnnouncementDialog(announcement: Announcement): void {
    const removeAnnouncementDialogRef = this.matDialog.open(
      RemoveAnnouncementDialogComponent,
      { data: announcement, width: "600px" }
    );

    removeAnnouncementDialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.removeAnnouncementEmitter.emit(announcement.id);
    });
  }
}
