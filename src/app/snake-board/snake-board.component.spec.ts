import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeBoardComponent } from './snake-board.component';

describe('SnakeBoardComponent', () => {
  let component: SnakeBoardComponent;
  let fixture: ComponentFixture<SnakeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
