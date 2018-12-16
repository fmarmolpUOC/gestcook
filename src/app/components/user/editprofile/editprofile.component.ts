import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserInterface } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user: UserInterface = {
    id: '',
    name: '',
    email: '',
    password: '',
    photoUrl: ''
  };

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private router: Router
    ) { }

  public providerId: string = 'null';

  @ViewChild('imageUser') inputImageUser: ElementRef;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  url = '';
  public email: string = '';
  public password: string = '';
  public error: string = '';

  ngOnInit() {
    this.onComprobarUserLogin();
    //this.onaddUser();
  }

  onComprobarUserLogin() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });
  }

  /*onAddUser(): void {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.getAuth().subscribe(user => {
          if (user) {
            console.log(user.email);
             user.updateProfile({
               displayName: '',
               photoURL: this.inputImageUser.nativeElement.value
             });
            }
          });  // .then(() => {
              this.router.navigate(['/home']);
            })
            // .catch((error) => console.log('error', error));
            .catch((err) => {
              if (err.message === 'The email address is badly formatted.') {
                this.error = 'El formato del correo electrónico es incorrecto.';
              }
              if ( err.message === 'The password must be 6 characters long or more.') {
                this. error = 'La contraseña debe contener mínimo 6 caracteres.';
              }
              if ( err.message === 'Password should be at least 6 characters') {
                this. error = 'La contraseña debe contener mínimo 6 caracteres.';
              }
              if ( err.message === 'The email address is already in use by another account.') {
                this. error = 'El correo electrónico está siendo usado.';
              }
              console.log(err);
            });
            // })*/

  onUpload(e) {
   // console.log('subir', e.target.files[0]);
   const id = Math.random().toString(36).substring(2);
   const file = e.target.files[0];
   const filePath = `userProfile/profile_${id}`;
   const ref = this.storage.ref(filePath);
   const task = this.storage.upload(filePath, file);
   this.uploadPercent = task.percentageChanges();
   task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 }

 onSelectFile(event) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    };
  }
}

  onaddUser() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         // user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: 'User',
          photoURL: this.inputImageUser.nativeElement.value
        }).then(function() {
          this.router.navigate(['/profile']);
        }).catch(function(error) {
          // An error happened.
        });
      } else {
          // No user is signed in.
        }
      });
    }

}
