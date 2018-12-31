import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDateComponent } from './menu-date.component';

describe('MenuDateComponent', () => {
  let component: MenuDateComponent;
  let fixture: ComponentFixture<MenuDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
