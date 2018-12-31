import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userName: string;
  public userEmail: string;
  public userPicture: string;
  public userId: string;

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

  idUserLogged: string;
  public providerId: string = 'null';

  constructor(
    private authService: AuthService
  ) { }

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

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
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
