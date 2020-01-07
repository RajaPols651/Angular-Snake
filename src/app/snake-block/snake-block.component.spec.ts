import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeBlockComponent } from './snake-block.component';

describe('SnakeBlockComponent', () => {
  let component: SnakeBlockComponent;
  let fixture: ComponentFixture<SnakeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
