import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFavoritesComponent } from './details-favorites.component';

describe('DetailsFavoritesComponent', () => {
  let component: DetailsFavoritesComponent;
  let fixture: ComponentFixture<DetailsFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
