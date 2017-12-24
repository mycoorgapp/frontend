import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
//import { AuthHttp } from 'angular2-jwt'
import { Http }    from '@angular/http';
@Injectable()
export class HomeStayService extends BaseService {

  constructor(http:Http){
    super(http);
    this.init('homestay');
  }
}