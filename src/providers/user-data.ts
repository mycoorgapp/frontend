import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from './user.service';
import { Http, Headers } from '@angular/http';

const API_HOST:string = environment.API_HOST;
@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public userService: UserService,
    protected http: Http
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(params) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    params.strategy = "local";
    return this.http.post(
      API_HOST + '/authentication', 
      JSON.stringify(params), 
      { headers: headers }
    )
    .toPromise()
    .then(response => {
      var resJSON = response.json();
      localStorage.setItem('token', resJSON.accessToken);
      return this.userService.list({})
    }).then( (users:any) =>{
      localStorage.setItem('user', JSON.stringify(users.data[0]));
      return {status: "success"};
    }).catch(e => {
      return e
    })
  }

  signup(userData) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    return this.userService.save(userData)
    //this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
