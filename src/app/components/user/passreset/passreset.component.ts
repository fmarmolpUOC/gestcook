import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-passreset',
  templateUrl: './passreset.component.html',
  styleUrls: ['./passreset.component.css']
})
export class PassresetComponent implements OnInit {

  public passReset: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public email: string = '';
  public error: string = '';

  ngOnInit() {
  }


/*resPassword() {
  this.authService.resetPassword(this.email);

  .then(() => this.passReset = true)
  .catch((message) => {
    if (message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
      this.error = 'El correo electrónico introducido no pertenece a un usuario registrado.';
    }
    if (message === 'The email address is badly formatted.') {
      this.error = 'El formato del correo electrónico es incorrecto.';
    }
  });
}*/


resetPassword() {
  const auth = firebase.auth();
  return auth.sendPasswordResetEmail(this.email)
    .then(() => {
      this.passReset = true;
      this.error = '';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        this.error = 'El correo electrónico introducido no está registrado.';
      }
      if (errorMessage === 'The email address is badly formatted.') {
        this.error = 'El formato del correo electrónico es incorrecto.';
      }
      if (!errorMessage) {
        this.error = '';
      }
      console.log(error);
      console.log(errorCode);
      console.log(errorMessage);

    });
}


}
