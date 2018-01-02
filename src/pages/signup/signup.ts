import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserSignupOptions } from '../../interfaces/user-signup-options';

import { TabsPage } from '../tabs-page/tabs-page';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserSignupOptions = {  username: '',  email: '',  password: '', mobile: ''};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup).then(res => {
        console.log(res);
        this.navCtrl.push(TabsPage);
      });
    }
  }
}
