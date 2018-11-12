import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http, public jwtHelper: JwtHelperService) {}

  registerUser(user) {
    // reach to backend API  - make that post request to register
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return observable with response
    return this.http
      .post('http://localhost:3000/users/register', user, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/users/authenticate', user, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }
  // Get profile
  getProfile() {
    const headers = new Headers();
    // get access to profile created helper function loadToken below
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('http://localhost:3000/users/profile', {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  // user data

  storeUserData(token, user) {
    //  save in local storage
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  //  to authorize access to profile  & Fetch from LocalStorage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
