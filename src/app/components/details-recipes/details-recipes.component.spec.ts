import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecipesComponent } from './details-recipes.component';

describe('DetailsRecipesComponent', () => {
  let component: DetailsRecipesComponent;
  let fixture: ComponentFixture<DetailsRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
