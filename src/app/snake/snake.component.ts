import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval, Subscription, from } from 'rxjs';
import { Direction } from '../enums';
import { SnakeBlock } from '../models/snake-block';


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
  //blocks: number[] = [1,2,3,4,5,6,7,8,9];
  blocks: SnakeBlock[] = this.getInitialBlocks();
  intervalSub: Subscription;
  private direction: Direction = Direction.None;
  constructor() { }

  ngOnInit() {
    
  }

  resetSnake(): void{
    this.direction = Direction.None;
    this.blocks = this.getInitialBlocks();
  }

  getSnakeDirection(): Direction{
    return this.blocks[0].getMovingDirection();
  }

  getInitialBlocks(): SnakeBlock[]{
    let blocks: SnakeBlock[] = [];
    let head = new SnakeBlock(100, 0);
    let b1 = new SnakeBlock(80, 0);
    b1.prev = head;

    let b2 = new SnakeBlock(80, 0);
    b2.prev = b1;

    let b3 = new SnakeBlock(60, 0);
    b3.prev = b2;
    blocks.push(head);
    blocks.push(b1);
    blocks.push(b2);
    blocks.push(b3);
    return blocks;
  }

  ngAfterViewInit(): void {
    this.intervalSub = interval(100).subscribe((n) => {
      if(this.direction == Direction.None) return;
      let head = this.blocks[0];
      from(this.blocks).subscribe((block) => {
        let dir: number = 1;
        let offsetX: number = 20;
        let offsetY: number = 20;
        //console.log(block);
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
    let lastBlock = this.blocks[this.blocks.length-1];
    let newBlock: SnakeBlock = null;
    if(lastBlock){
      if(lastBlock.getMovingDirection() == Direction.Left){
        newBlock = new SnakeBlock(lastBlock.position.left + 20, lastBlock.position.top);
      }

      if(lastBlock.getMovingDirection() == Direction.Right){
        newBlock = new SnakeBlock(lastBlock.position.left - 20, lastBlock.position.top);
      }

      if(lastBlock.getMovingDirection() == Direction.Up){
        newBlock = new SnakeBlock(lastBlock.position.left, lastBlock.position.top + 20);
      }

      if(lastBlock.getMovingDirection() == Direction.Down){
        newBlock = new SnakeBlock(lastBlock.position.left, lastBlock.position.top - 20);
      }
    }

    newBlock.prev = lastBlock;
    this.blocks.push(newBlock);
  }

}
