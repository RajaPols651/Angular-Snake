import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeFoodComponent } from './snake-food.component';

describe('SnakeFoodComponent', () => {
  let component: SnakeFoodComponent;
  let fixture: ComponentFixture<SnakeFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
