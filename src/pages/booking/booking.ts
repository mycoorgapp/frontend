import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  homeStayDetail : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.homeStayDetail = this.navParams.data.homeStay;
  	if(!this.homeStayDetail.booking){
  		this.homeStayDetail["booking"] = {
  			guests:3,
  			selected_room: "double bed room",
  			check_out: "22/12/2017",
  			check_in: "1/1/2018",
  			total_amount: 50000
  		}
  	}
  }

}
