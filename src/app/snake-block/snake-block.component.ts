import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-snake-block',
  templateUrl: './snake-block.component.html',
  styleUrls: ['./snake-block.component.css']
})
export class SnakeBlockComponent implements OnInit {

  @Input()
  Style: object;
  
  constructor() { }

  ngOnInit() {
  }

}
