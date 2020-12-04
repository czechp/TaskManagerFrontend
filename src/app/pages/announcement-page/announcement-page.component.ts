import { Component, OnInit } from "@angular/core";
import { Announcement } from "src/app/models/Announcement";
import { HttpApiService } from "src/app/services/httpApiService/http-api.service";
import { announcementEndopoint } from "src/app/services/URL";

@Component({
  selector: "app-announcement-page",
  templateUrl: "./announcement-page.component.html",
  styleUrls: ["./announcement-page.component.css"],
})
export class AnnouncementPageComponent implements OnInit {
  public statement = "";
  public announcements: Announcement[];

  constructor(private httpApiService: HttpApiService) {}

  ngOnInit(): void {
    this.getAnnouncements();
  }

  private clearStatement() {
    this.statement = "";
  }

  public getAnnouncements(): void {
    this.httpApiService.get(announcementEndopoint, []).subscribe(
      (next: any) => {
        this.announcements = this.sortAnnouncementsById(next);
      },
      (error: any) => {
        this.statement = this.httpApiService.errorStatementHandler(
          error.status
        );
      }
    );
  }

  private sortAnnouncementsById(announcements: Announcement[]): Announcement[] {
    return announcements.sort(
      (x1: Announcement, x2: Announcement) => x1.id - x2.id
    );
  }
}
