import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, MenuController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, 
    public userData: UserData, 
    public menuCtrl: MenuController
    ) {

    this.menuCtrl.swipeEnable(false);
   }

  onLogin(form: NgForm) {
    this.submitted = true;
    console.log("(this.login ", this.login);
    
    if (form.valid) {
      this.userData.login(this.login).then(res => {
        console.log("res  ", res);
        if(res.status === "success"){
          this.navCtrl.push(TabsPage);
        }
      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
