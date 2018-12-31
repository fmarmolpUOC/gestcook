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

  idUserLogged: string;

    user: UserInterface = {
      id: '',
      email: '',
      password: '',
      photoUrl: '',
      name: '',
      surname: '',
      street: '',
      number: '',
      cp: '',
      town: '',
      province: '',
      state: 'España',
      phone: '',
    };
  
  usr: UserInterface = {
    id: '',
    email: '',
    password: '',
    photoUrl: '',
    name: '',
    surname: '',
    street: '',
    number: '',
    cp: '',
    town: '',
    province: '',
    state: 'España',
    phone: '',
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
  }

  onComprobarUserLogin() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.user.id = user.uid;
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        this.idUserLogged = user.uid;
        console.log('UID: ', this.idUserLogged);
        this.getUserDetails();
      }
    });
  }

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

onClickUpdate({value}: {value: UserInterface}) {
  value.id = this.idUserLogged;
  value.photoUrl = this.inputImageUser.nativeElement.value;
  this.authService.updateUser(value);
  this.router.navigate(['/profile/']);
}

getUserDetails() {
  this.authService.getOneUser(this.idUserLogged).subscribe(usr => this.usr = usr);
  console.log('Usr:', this.usr);
}

}
