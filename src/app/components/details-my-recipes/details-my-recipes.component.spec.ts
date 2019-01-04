import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMyRecipesComponent } from './details-my-recipes.component';

describe('DetailsMyRecipesComponent', () => {
  let component: DetailsMyRecipesComponent;
  let fixture: ComponentFixture<DetailsMyRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMyRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
