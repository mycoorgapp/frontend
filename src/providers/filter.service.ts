import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AuthHttp } from 'angular2-jwt'

@Injectable()
export class FilterService extends BaseService {

  constructor(http:AuthHttp){
    super(http);
    this.init('users');
  }
}