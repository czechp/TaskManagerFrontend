import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-remove-announcement-dialog",
  templateUrl: "./remove-announcement-dialog.component.html",
  styleUrls: ["./remove-announcement-dialog.component.css"],
})
export class RemoveAnnouncementDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
