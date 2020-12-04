import { Component, OnInit } from "@angular/core";
import { Announcement } from "src/app/models/Announcement";
import { AnnouncementComment } from "src/app/models/AnnouncementComment";
import { HttpApiService } from "src/app/services/httpApiService/http-api.service";
import { announcementEndopoint } from "src/app/services/URL";
import { fade } from "src/app/utilities/animations/animations";

@Component({
  selector: "app-announcement-page",
  templateUrl: "./announcement-page.component.html",
  styleUrls: ["./announcement-page.component.css"],
  animations: [fade],
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

  public addCommentToAnnouncement(data: string[]): void {
    const [announcementId, commentContent] = data;
    const announcementComment = { content: commentContent };
    this.httpApiService
      .post(
        announcementEndopoint + '/' + announcementId + "/comments",
        announcementComment,
        []
      )
      .subscribe(
        (next: any) => {this.getAnnouncements()},
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(
            error.status
          );
        }
      );
    this.clearStatement();
  }

  private sortAnnouncementsById(announcements: Announcement[]): Announcement[] {
    return announcements.sort(
      (x1: Announcement, x2: Announcement) => x1.id - x2.id
    );
  }
}
