import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  idRecipe: string;
  idUserLogged: string;
  url = '';

  recipe: RecipeInterface = {
    id: '',
    title: '',
    description: '',
    preparation: '',
    ingredients: '',
    publicationDate: '',
    userId: '',
    userEmail: '',
    imageUrl: '',
  };

    constructor(
      private authService: AuthService,
      private recipeService: RecipeService,
      private router: Router,
      private storage: AngularFireStorage,
      private route: ActivatedRoute
    ) { }

    @ViewChild('imageRecipe') inputImageRecipe: ElementRef;

    uploadPercent: Observable<number>;
    urlImage: Observable<string>;

  ngOnInit() {
    this.getDetallesReceta();
    this.isUserLogged();
  }

  onUpload(e) {
    console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `gestcook/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
      }
    });
  }

  getDetallesReceta() {
    this.idRecipe = this.route.snapshot.params['id'];
    this.recipeService.getOneRecipe(this.idRecipe).subscribe( recipe => this.recipe = recipe);
  }

  onClickUpdate({value}: {value: RecipeInterface}) {
    value.id = this.idRecipe;
    value.imageUrl = this.inputImageRecipe.nativeElement.value;
    this.recipeService.updateRecipe(value);
    this.router.navigate(['/details/' + this.idRecipe]);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

}
