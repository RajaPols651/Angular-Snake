import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription, interval } from 'rxjs';
import { SnakeComponent, Direction, SnakeBlock, Position } from '../snake/snake.component';
import { Helper } from '../utilities/utilities';
import { ThrowStmt } from '@angular/compiler';
import { MessageComponent } from '../message/message.component';

export class KeyBoardKeys{
  static readonly ESC_KEY = 27;
  static readonly LEFT_ARROW_KEY = 37;
  static readonly RIGHT_ARROW_KEY = 39;
  static readonly DOWN_ARROW_KEY = 40;
  static readonly UP_ARROW_KEY = 38;
  static readonly SPACEBAR_KEY = 32;
  static readonly A_KEY = 65;
}

@Component({
  selector: 'app-snake-board',
  templateUrl: './snake-board.component.html',
  styleUrls: ['./snake-board.component.css']
})
export class SnakeBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription : Subscription;
  width: number = 0;
  height: number = 0;
  board : object = null;
  gameStyle: object = null;
  intervalSub: Subscription;
  snakeDied: boolean = false;
  minLeft: number = 0;
  minTop: number = 0;
  maxLeft: number = 20;
  maxTop: number = 20;
  topScore: number = 1;
  snakeLength: number = 3;

  FoodPosition: Position;

  @ViewChild("Snake", { static: false })
  private snakeComponent: SnakeComponent;

  @ViewChild("message", { static: false })
  private messageComponent: MessageComponent;


  constructor() { }

  ngOnInit() {
   this.setUpBoard();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.intervalSub.unsubscribe();
  }

  ngAfterViewInit() {
    const body = document.body;
    this.subscription = fromEvent(body, 'keydown').subscribe((e: KeyboardEvent) => 
      this.play(e.keyCode)
    );
  }

  placeRandomFood(): void{
    this.FoodPosition = new Position(Helper.getActualLeft(Helper.getRandomInt(this.maxLeft)), 
                        Helper.getActualTop(Helper.getRandomInt(this.maxTop)));
    console.log(this.FoodPosition);
  }

  setUpBoard() : void{
    this.snakeDied = false;
    this.snakeLength = 3;
    this.height = Helper.getClientHeight();
    this.width = Helper.getClientWidth();
    
    this.maxLeft = Math.floor(this.width / 20) * 20 - 80;
    this.maxTop = Math.floor(this.height / 20) * 20 - 80;

    this.board = {
      "background-color": "red",
      "height" : this.height -50 + "px",
      "width": this.width - 50 + "px",
      "margin": "10px",
      "position": "relative",
      "left": "0px",
      "top": "0px"
    };

     this.gameStyle = {
      "background-color": "blue",
      "height" : this.maxTop + "px",
      "width": this.maxLeft + "px",
      "left": "20px",
      "top": "20px",
      "position": "absolute"
    };
    //this.snakeComponent.resetSnake();
    this.placeRandomFood();
  }

  private play(keyCode: number): void{
    if(this.snakeDied) return;

    if(keyCode == KeyBoardKeys.LEFT_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Right)
      {
      //  this.snakeDied = true;
        return;
      }
      this.snakeComponent.moveLeft();
    }
    if(keyCode == KeyBoardKeys.UP_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Down)
      {
       // this.snakeDied = true;
        return;
      }
      this.snakeComponent.moveUp();
    }
    if(keyCode == KeyBoardKeys.RIGHT_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Left)
      {
      //  this.snakeDied = true;
        return;
      }
      this.snakeComponent.moveRight();
    }
    if(keyCode == KeyBoardKeys.DOWN_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Up)
      {
      //  this.snakeDied = true;
        return;
      }
      this.snakeComponent.moveDown();
    }
    if(keyCode == KeyBoardKeys.SPACEBAR_KEY){
      this.snakeComponent.pause();
    }

    if(keyCode == KeyBoardKeys.A_KEY){
      this.snakeComponent.addBlock();
    }
  }

  onMove(event: SnakeBlock){
    if(event.position.left == this.FoodPosition.left && event.position.top == this.FoodPosition.top){
      this.snakeComponent.addBlock();
      this.snakeLength++;
      this.placeRandomFood();
    }
    if(event.position.left < this.minLeft && event.getMovingDirection() == Direction.Left){
      this.snakeDied = true;
    }

    if(event.position.left > this.maxLeft - 20 && event.getMovingDirection() == Direction.Right){
      this.snakeDied = true;
    }

    if(event.position.top < this.minTop && event.getMovingDirection() == Direction.Up){
      this.snakeDied = true;
    }

    if(event.position.top > this.maxTop - 20 && event.getMovingDirection() == Direction.Down){
      this.snakeDied = true;
    }

    if(this.snakeDied){
      this.messageComponent.showMessage(
        {
          position: new Position(200, 200),
          message: 'Oops!! Snake killed. Play again???'
        }
      );
      this.snakeComponent.pause();
    }
  }

  resetBoard(): void{
    this.setUpBoard();
    this.snakeComponent.resetSnake();
  }

  onMessageOk(e): void{
    this.resetBoard();
  }
}
