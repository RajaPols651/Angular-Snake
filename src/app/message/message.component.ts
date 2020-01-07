import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Position } from '../snake/snake.component';
import { Helper } from '../utilities/utilities';

export interface MessageSettings{
  position: Position;
  message: string;
}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  
  public left: string;
  public top: string;
  public message: string;
  public show: boolean;
  constructor() { }

  @Output()
  Ok: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.Ok.unsubscribe();
  }

  public showMessage(settings: MessageSettings){
    this.show = true;
    this.setPosition(Helper.getClientWidth() / 2, Helper.getClientHeight() / 2);
    this.setMessage(settings.message);
  }

  public setPosition(left: number, top: number){
    this.left = `${left}px`;
    this.top = `${top}px`;
  }

  public setMessage(message: string){
    this.message = message;
  }

  public onOk(): void{
    this.show = false;
    this.Ok.emit(null);
  }

}
