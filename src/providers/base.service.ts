import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BaseService {
  private host: string = environment.API_HOST;
  private basePath: string;

  constructor(private http: AuthHttp) { }

  init(basePath: string) {
    this.basePath = basePath;
  }

  protected baseURL() {
    return this.host + '/' + this.basePath
  }

  list(filters?, sort?) {
    let headers = new Headers();
    headers.append('Accept','application/json');
    //chethan : as of now no need of this 
    var sorts = [];
    for (var key in sort) {
      var value = sort[key];
      if(!Object.keys(filters).find((val) => 
        val.indexOf("$sort") != -1 && val != "$sort[reset]")){
        sorts.push('$sort[' + key + ']=' + value);
      }
    }
    var sortString = sorts.join('&');

    var params = new URLSearchParams(sortString);
    if(!(filters instanceof Array)) {
      for(var filter in filters){
        params.append(filter, filters[filter]);
      }
    }else{
      for(let filter of filters){
        params.append(filter.key, filter.val);
      }
    }
    
    return this.http.get(this.baseURL(),{ search:params, headers:headers })
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(this.handleError);
  }

  get(id, params=null) {
    let headers = new Headers();
    headers.append('Accept','application/json');
    
    let url = this.baseURL() + '/' + id;
    if(params) {
      url += '?' + params
    }
    return this.http.get(url, {headers:headers})
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(this.handleError);
  }

  save(item) {
    if (!item._id || item._id === 'new') {
      return this.create(item)
    } else {
      return this.update(item)
    }
  }

  create(item) {
    delete item._id
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.baseURL(), JSON.stringify(item), { headers: headers })
      .toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
  }
  
  update(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept','application/json');
    let id = item._id;
    delete item._id;
    return this.http.put(this.baseURL() + '/' + id, JSON.stringify(item), { headers: headers })
      .toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
  }
/*
  patchMultiple(item, query) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept','application/json');
    let id = item._id;
    delete item._id;
    return this.http.patch(this.baseURL() + '?' + query, JSON.stringify(item), { headers: headers })
      .toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
  }

  patch(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept','application/json');
    let id = item._id;
    delete item._id;
    return this.http.patch(this.baseURL() + '/' + id, JSON.stringify(item), { headers: headers })
      .toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
  }
*/
/*
  delete(id) {
    let headers = new Headers();
    headers.append('Accept','application/json');
    return this.http.delete(this.baseURL() + '/' + id,{headers:headers})
      .toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
  }
*/
  handleError(e){
    /*if(typeof e.json === 'function') {
      let json = e.json();
      
      
      if(json.code && json.code.toString() === '401') {
        localStorage.clear();
        window.location.replace('/login');
        return;
      }
    }
    else if(/JWT/i.test(e.message)) {
      localStorage.clear();
      window.location.replace('/login');
      return;
    }*/
    
    throw e;
  }
}
