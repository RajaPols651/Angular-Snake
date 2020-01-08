import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval, Subscription, from } from 'rxjs';
import { Direction } from '../enums';
import { SnakeBlock } from '../models/snake-block';
import { Snake } from '../models/snake-model';


@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() move: EventEmitter<SnakeBlock> = new EventEmitter();
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
    this.move.unsubscribe();
  }
  snake: Snake;
  intervalSub: Subscription;
  private direction: Direction = Direction.None;
  constructor() { 
    this.snake = new Snake(3, null);
  }

  ngOnInit() {
    
  }

  resetSnake(): void{
    this.direction = Direction.None;
    this.snake.resetSnake();
  }

  getSnakeDirection(): Direction{
     return this.snake.blocks[0].getMovingDirection();
  }

  ngAfterViewInit(): void {
    this.intervalSub = interval(100).subscribe((n) => {
      if(this.direction == Direction.None) return;
      let head = this.snake.blocks[0];
      from(this.snake.blocks).subscribe((block) => {
        let dir: number = 1;
        let offsetX: number = 20;
        let offsetY: number = 20;
        if(this.direction == Direction.Left || this.direction == Direction.Up){
          dir = -1;
        }
        if(this.direction == Direction.Left || this.direction == Direction.Right){
          offsetX = 20;
          offsetY = 0;
        }
        if(this.direction == Direction.Up || this.direction == Direction.Down){
          offsetY = 20;
          offsetX = 0;
        }
        if(block == head){
          block.setActive(block.position.left + dir * offsetX, block.position.top + dir * offsetY);
          this.move.emit(block);
        }
        else{
          block.setActive(block.prev.prevPosition.left, block.prev.prevPosition.top);
        }

      });
    });
    
  }

  go(direction: Direction): void{
    switch (direction) {
      case Direction.Down:
        this.moveDown();
        break;
      case Direction.Up:
        this.moveUp();
        break;
      case Direction.Left:
        this.moveLeft();
        break;
      case Direction.Right:
        this.moveRight();
        break;
      default:
        break;
    }
  }

  moveUp() : void{
    this.direction = Direction.Up;
  }

  moveDown(): void{
    this.direction = Direction.Down;
    
  }

  moveLeft(): void{
    this.direction = Direction.Left;
   
  }

  moveRight(): void{
    this.direction = Direction.Right;
    
  }

  pause() {
    this.direction = Direction.None;
  }

  addBlock(): void{
    this.snake.addBlocks(1);
  }

}
