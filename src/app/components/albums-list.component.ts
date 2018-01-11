import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AlbumService} from '../services/album.service';
import {Album} from '../models/album';

@Component({
  selector: 'albums-list',
  templateUrl: '../views/albums-list.html',
  providers: [AlbumService]
})

export class AlbumsListComponent implements OnInit{
  public title: string;
  public albums: Album[];
  public errorMessage: any;
  public loading: boolean;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumService
  ){
    this.title = "Listado de albums";
  }

  ngOnInit(){
    console.log("Album-list.component.ts cargado");
    this.getAlbums();
  }

  getAlbums(){
    this.loading = true;
    this._albumService.getAlbums().subscribe(
      result => {
        this.albums = result.albums;
        if(!this.albums){
          alert("Error al obtener albums");
        }
        this.loading = false;
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
        }
        this.loading = false;
      }
    );
  }

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelAlbum(){
    this.confirmado = null;
  }

  onDeleteAlbum(id){
    this._albumService.deleteAlbum(id).subscribe(
      res => {
        if(!res.album){
          alert("Error en el servidor");
        }else{
          this.getAlbums();
        }
      },err => {
        this.errorMessage = <any>err;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
        }
      }
    );
  }
}