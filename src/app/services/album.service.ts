import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Album} from '../models/album';
import {GLOBAL} from './global';

@Injectable()
export class AlbumService{
  public url: string;

  constructor(private _http: Http){
    this.url= GLOBAL.url;
  }

  getAlbum(id: string){
    return this._http.get(this.url+'album/'+id)
      .map(res => res.json());
  }

  getAlbums(){
    return this._http.get(this.url+'albums')
      .map(res => res.json());//recoje la informacion por medio de calback y la devuelve
  }

  addAlbum(album: Album){
    let json = JSON.stringify(album);
    let params = json;
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url+'album', params, {headers: headers})
      .map(res => res.json());
  }
}