import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input()
  public title: string='';

  @Input()
  public statement: string='';

  @Input()
  public subTitle: string='';

  constructor() {
  }

  ngOnInit(): void {
  }

}
