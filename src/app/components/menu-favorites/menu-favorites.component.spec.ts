import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFavoritesComponent } from './menu-favorites.component';

describe('MenuFavoritesComponent', () => {
  let component: MenuFavoritesComponent;
  let fixture: ComponentFixture<MenuFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
