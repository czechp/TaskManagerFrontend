import { AnnouncementComment } from "./AnnouncementComment";
import { AppUser } from "./AppUser";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  appUser: AppUser;
  comments: AnnouncementComment[];
  creationDate: Date;
  updateDate: Date;
}
