import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilterService } from '../../providers/filter.service'

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  private query = {};

  filters;
  isLoading = true;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
	  public filterService: FilterService
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  ionViewWillEnter() {
    if (!this.navParams.data.filterName) {
      return;
    }
    this.isLoading = true;

    let query = Object.assign({}, this.query, {
      for: this.navParams.data.filterName
    });

    for(let filter in query){
      if(/^\$sort/.test(filter)){
        delete query[filter]
      }
    }
    
    this.filterService.list(this.navParams.data.filterName).then(filters => {
      this.filters = filters;
      this.isLoading = false;
    });
  }

}
