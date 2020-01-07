import { Component, OnInit, Input } from '@angular/core';
import { Position } from '../models/position';

@Component({
  selector: 'app-snake-food',
  templateUrl: './snake-food.component.html',
  styleUrls: ['./snake-food.component.css']
})
export class SnakeFoodComponent implements OnInit {

  @Input()
  Position: Position;

  constructor() { }

  ngOnInit() {
  }

}
