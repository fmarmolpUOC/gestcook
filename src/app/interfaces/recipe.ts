import { FormArray } from '@angular/forms';
export interface RecipeInterface {
  id?: string;
  title?: string;
  description?: string;
  preparation?: string;
  ingredients?: string;
  publicationDate?: any;
  userId?: string;
  userEmail?: string;
  imageUrl?: string;

}
