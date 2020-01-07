import { Direction } from '../enums';
import { Position } from './position';

export class SnakeBlock{
    style: object = null;
    id: number;
    prevPosition: Position;
    position: Position;
    prev: SnakeBlock;
    movingDirection: Direction = Direction.None;
    constructor(left: number, top: number){
      this.prevPosition = new Position(left, top);
      this.position = { 
        "left": left,
        "top": top
      }
      this.style = {
        "background-color": "red",
        "left": this.position.left + "px",
        "top": this.position.top + "px",
        "height": "20px",
        "width": "20px",
        "position": "absolute",
        "border": "2px solid #000080"
      }
    }
  
  
    getMovingDirection(): Direction{
      if(this.prevPosition.left == this.position.left && this.prevPosition.top == this.position.top){
        return Direction.None;
      }
  
      if(this.prevPosition.left != this.position.left){
        if(this.prevPosition.left > this.position.left) return Direction.Left;
        else return Direction.Right;
      }
  
      if(this.prevPosition.top != this.position.top){
        if(this.prevPosition.top > this.position.top) return Direction.Up;
        else return Direction.Down;
      }
  
      return Direction.None;
    }
  
    setActive(left: number, top: number){
      this.prevPosition = new Position(this.position.left, this.position.top);
      this.position.left = left;
      this.position.top = top;
  
      this.style = {
        "background-color": "red",
        "left": left + "px",
        "top": top + "px",
        "height": "20px",
        "width": "20px",
        "position": "absolute",
        "border": "2px solid #000080"
      }
    }
  }