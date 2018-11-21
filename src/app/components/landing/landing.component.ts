import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickGoogleLogin() {
    this.authService.loginGoogle()
    .then((res) => {
      //console.log(res);
      this.router.navigate(['/home']);
    }).catch( err => console.log(err.message));
  }


}
