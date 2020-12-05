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
import { MatExpansionPanel } from "@angular/material/expansion";
import { Announcement } from "src/app/models/Announcement";
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';

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

  @ViewChildren('announceExpensionPanel')
  public panels: QueryList<MatExpansionPanel>;

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  ngAfterViewInit(): void {
    this.panels.changes
    .subscribe(
        ()=>{
          setTimeout(()=>this.panels.first.open(), 100)
        }
    );
  }

  ngOnInit(): void {}

  public addComment(announcementId: number, commentContent: string): void {
    this.addCommentEmitter.emit([announcementId, commentContent]);
  }

  public isOwner(ownerUsername: string):boolean{
    const isOwner = ownerUsername === this.authorizationService.getUsername();
    const isAdmin = this.authorizationService.getRole() === 'ADMIN';
    return isOwner || isAdmin;
  }
}
