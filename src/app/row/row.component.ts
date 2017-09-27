import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input() row: any;
  @Output() tileClick = new EventEmitter();

  handleTileClick(tile){
    this.tileClick.next(tile);
  }

  constructor() { }

  ngOnInit() {
  }

}
