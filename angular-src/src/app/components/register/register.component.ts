import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    //  build user object
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('fill all fields', { timeout: 3000 });
      return false;
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('wrong email', { timeout: 3000 });
      return false;
    }
    //  Register User
    this.auth.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are registered and can login', {
          timeout: 3000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
