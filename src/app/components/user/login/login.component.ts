import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public afAuth: AngularFireAuth) { }

  public email: string = '';
  public password: string = '';
  public error: string = '';

  ngOnInit() {
  }

  onLogin(): void {
    // console.log('email', this.email);
    // console.log('pass', this.password);
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/home']);
      }).catch(err => this.error = err.message); // catch(err => console.log('err', err.message));
  }

}
