export class Position{
    left: number;
    top: number;
  
    constructor(left: number, top: number){
      this.left = left;
      this.top = top;
    }
  
    public static NewPosition(position: Position): Position{
      return new Position(position.left, position.top);
    }
}