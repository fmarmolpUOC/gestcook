import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage) { }
    @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';
  public error: string = '';

    uploadPercent: Observable<number>;
    urlImage: Observable<string>;
    url = '';

  ngOnInit() {
  }

  onUpload(e) {
     console.log('subir', e.target.files[0]);
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
        console.log('url', this.url);
      };
    }
  }

  onAddUser(): void {
    this.authService.registerUser(this.email, this.password/*, this.inputImageUser.nativeElement.value*/)
      .then((res) => {
        this.authService.getAuth().subscribe(user => {
          if (user) {
            console.log(user.email);
             /*user.updateProfile({
               displayName: '',
               photoURL: this.inputImageUser.nativeElement.value,
             });*/
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
            // })
  }

}


