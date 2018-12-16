import { Component, OnInit } from '@angular/core';
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
  ) { }

  public email: string = '';

  ngOnInit() {
  }


resetPassword() {
  this.authService.resetPassword(this.email)
  .then(() => this.passReset = true);
  console.log(this.email);
}

}
