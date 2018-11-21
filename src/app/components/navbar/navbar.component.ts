import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Rx';


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
  public isLogin: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onComprobarUserLogin() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        console.log(auth);
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }



}
