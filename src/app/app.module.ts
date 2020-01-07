import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SnakeBoardComponent } from './snake-board/snake-board.component';
import { SnakeComponent } from './snake/snake.component';
import { SnakeBlockComponent } from './snake-block/snake-block.component';
import { SnakeFoodComponent } from './snake-food/snake-food.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeBoardComponent,
    SnakeComponent,
    SnakeBlockComponent,
    SnakeFoodComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
