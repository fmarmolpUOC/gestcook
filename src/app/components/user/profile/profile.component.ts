import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserInterface } from '../../../interfaces/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

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

  public providerId: string = 'null';

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
       // console.log('UID: ', this.idUserLogged);
        this.getUserDetails();
      }
    });
  }

  getUserDetails() {
    this.authService.getOneUser(this.idUserLogged).subscribe(usr => this.usr = usr);
    // console.log('Usr:', this.usr);
  }

  onLogout() {
    this.authService.logout();
  }

}