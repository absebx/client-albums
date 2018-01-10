import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AlbumService} from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'albums-add',
  templateUrl: '../views/album-add.html',
  providers: [AlbumService]
})

export class AlbumAddComponent implements OnInit{
  public title: string;
  public album: Album;
  public nombre: string;
  public errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumService
  ){
    this.title = "";
    this.nombre = "Agregar nuevo album";
  }

  ngOnInit(){
    console.log("Album-add.component.ts cargado");
    this.album = new Album("","");
  }

  onSubmit(){
    console.log("enviando el formulario perra");
    console.log(this.album);
    this._albumService.addAlbum(this.album).subscribe(
      response => {
        this.album = response.album;
        if(!response.album){
          alert("Error en el servidor");
        }else{
          this._router.navigate(['/']);
        }
      }, error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
        }
      }
    );
  }
}