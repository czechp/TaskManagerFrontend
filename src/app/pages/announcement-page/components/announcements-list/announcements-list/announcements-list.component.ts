import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Announcement } from "src/app/models/Announcement";

@Component({
  selector: "app-announcements-list",
  templateUrl: "./announcements-list.component.html",
  styleUrls: ["./announcements-list.component.css"],
})
export class AnnouncementsListComponent implements OnInit {
  @Input()
  public announcements: Announcement[] = [];

  @Output()
  public addCommentEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public addComment(announcementId: number, commentContent: string):void{
    this.addCommentEmitter.emit([announcementId, commentContent]);
  }
}
