import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userEmail: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    public zone: NgZone
  ) { }

  ngOnInit() {
    this.isUserLogged();
  }

  onClickGoogleLogin() {
    this.authService.loginGoogle()
    .then((res) => {
      // console.log(res);
      // this.router.navigate(['/home']); *DONA ERROR*
      this.zone.run(() => { this.router.navigate(['/home']); });
    }).catch( err => console.log(err.message));
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.router.navigate(['/home']);
        //this.userEmail = user.email;
        //console.log(this.userEmail);
      }
    });
  }

}
