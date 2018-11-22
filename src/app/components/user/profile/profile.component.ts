import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  public userName: string;
  public userEmail: string;
  public userPicture: string;
  public userId: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onComprobarUserLogin();
  }

  onComprobarUserLogin() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.userName = auth.displayName;
        this.userEmail = auth.email;
        this.userPicture = auth.photoURL;
        this.userId = auth.uid;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

}