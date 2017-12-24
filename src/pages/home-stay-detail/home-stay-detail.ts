import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { HomeStayService } from '../../providers/homestay.service';

@Component({
  selector: 'page-home-stay-detail',
  templateUrl: 'home-stay-detail.html',
  providers: [ HomeStayService ]
})
export class HomeStayDetailPage {
  homestay: any;
  
  constructor(public dataProvider: ConferenceData, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private homeStayService: HomeStayService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStayDetailPage');
  }

  ionViewWillEnter() {
    this.homeStayService.get(this.navParams.data.homeStayId).then(res => {
      console.log("res ", res);
      
      this.homestay = res;
      this.homestay.imageSlide = ["assets/img/speakers/bear.jpg","assets/img/speakers/lion.jpg","assets/img/speakers/duck.jpg","assets/img/speakers/lion.jpg"]
      return res;
    });
    

  }


	goToSessionDetail(session: any) {
		this.navCtrl.push('HomeStayDetailPage', { sessionId: session.id });
	}
}