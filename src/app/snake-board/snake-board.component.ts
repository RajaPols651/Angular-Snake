import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { SnakeComponent } from '../snake/snake.component';
import { Helper, KeyBoardKeys } from '../utilities/utilities';
import { MessageComponent } from '../message/message.component';
import {  Direction  } from '../enums';
import { Position } from '../models/position';
import { SnakeBlock } from '../models/snake-block';

@Component({
  selector: 'app-snake-board',
  templateUrl: './snake-board.component.html',
  styleUrls: ['./snake-board.component.css']
})
export class SnakeBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription : Subscription;
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
  snakeLength: number = 5;

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
  }

  setUpBoard() : void{
    this.snakeDied = false;
    this.snakeLength = 5;
    this.height = Helper.getClientHeight();
    this.width = Helper.getClientWidth();
    this.maxLeft = Math.floor(this.width / 20) * 20 - 80;
    this.maxTop = Math.floor(this.height / 20) * 20 - 140;

    this.placeRandomFood();
  }

  private play(keyCode: number): void{
    if(this.snakeDied) return;

    if(keyCode == KeyBoardKeys.LEFT_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Right)
      {
        return;
      }
      this.snakeComponent.moveLeft();
    }
    if(keyCode == KeyBoardKeys.UP_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Down)
      {
        return;
      }
      this.snakeComponent.moveUp();
    }
    if(keyCode == KeyBoardKeys.RIGHT_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Left)
      {
        return;
      }
      this.snakeComponent.moveRight();
    }
    if(keyCode == KeyBoardKeys.DOWN_ARROW_KEY){
      if(this.snakeComponent.getSnakeDirection() == Direction.Up)
      {
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

    else if(event.position.left > this.maxLeft - 20 && event.getMovingDirection() == Direction.Right){
      this.snakeDied = true;
    }

    else if(event.position.top < this.minTop && event.getMovingDirection() == Direction.Up){
      this.snakeDied = true;
    }

    else if(event.position.top > this.maxTop - 20 && event.getMovingDirection() == Direction.Down){
      this.snakeDied = true;
    }
    else if(this.snakeComponent.snake.isBitingSelf(JSON.parse(JSON.stringify(this.snakeComponent.snake.blocks)))){
      console.log('biting self..dead');
      this.snakeDied = true;
    }

    if(this.snakeDied){
      this.topScore = Math.max(this.topScore, this.snakeLength);
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
