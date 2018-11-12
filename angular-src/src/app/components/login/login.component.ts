import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.auth.authenticateUser(user).subscribe(data => {
      // console.log(data);
      if (data.success) {
        this.auth.storeUserData(data.token, data.user);
        this.flashMessage.show('you are logged in', { timeout: 5000 });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, { timeout: 5000 });
        this.router.navigate(['login']);
      }
    });
  }
}
