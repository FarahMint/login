import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  constructor() {}

  validateRegister(user) {
    // if (
    //   user.name === undefined ||
    //   user.username === undefined ||
    //   user.email === undefined ||
    //   user.password === undefined
    // ) {
    //   return false;
    // } else {
    //   return true;
    // }

    return user.name === undefined ||
      user.username === undefined ||
      user.email === undefined ||
      user.password === undefined
      ? false
      : true;
    // }
  }

  validateEmail(email) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return re.test(email);
  }
}
