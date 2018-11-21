import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onClickGoogleLogin() {
    this.authService.loginGoogle()
    .then((res) => {
      console.log(res);
    }).catch( err => console.log(err.message));
  }


}
