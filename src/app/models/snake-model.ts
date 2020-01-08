import { SnakeBlock } from './snake-block';
import { Position } from './position';
import { Direction } from '../enums';

export class Snake{
    blocks: SnakeBlock[] = [];
    private headPosition: Position;
    private tail: SnakeBlock;
    
    public get head() : SnakeBlock {
      return this.blocks[0];
    }
    
    constructor(initialLength: number, headPosition: Position){
        this.blocks = this.getInitialBlocks();
        this.headPosition = headPosition;

    }

    resetSnake(): void{
        this.blocks = this.getInitialBlocks();
    }

    private getInitialBlocks(): SnakeBlock[]{
        let blocks: SnakeBlock[] = [];
        let head = new SnakeBlock(100, 0);
        let b1 = new SnakeBlock(80, 0);
        b1.prev = head;
    
        let b2 = new SnakeBlock(60, 0);
        b2.prev = b1;
    
        let b3 = new SnakeBlock(40, 0);
        b3.prev = b2;
        blocks.push(head);
        blocks.push(b1);
        blocks.push(b2);
        blocks.push(b3);
        this.tail = b3;
        return blocks;
      }

      addBlocks(num: number){
          for(let i = 0; i < num; i++)
            this.addBlock();
      }

      addBlock(): void{
       // let lastBlock = this.blocks[this.blocks.length-1];
       let lastBlock = this.tail;
        let newBlock: SnakeBlock = null;
        if(lastBlock){
            console.log('addada');
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
        if(newBlock){
            this.tail = newBlock;
            newBlock.prev = lastBlock;
            this.blocks.push(newBlock);
        }
        
      }
}