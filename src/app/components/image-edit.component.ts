import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ImageService} from '../services/image.service';
import { Image } from '../models/image';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'image-edit',
  templateUrl: '../views/image-add.html',
  providers: [ImageService]
})

export class ImageEditComponent implements OnInit{
  public name: string;
  public image: Image;
  public errorMessage: any;
  public is_edit:boolean;
  public filesToUpload: Array<File>;
  public resultUpload;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _imageService: ImageService
  ){
    this.name="Editar imagen";
    this.is_edit = true;
  }

  ngOnInit(){
    console.log("Image-edit.component.ts cargado");
    this.image = new Image("","", "");
    this.getImage();
  }

  getImage(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._imageService.getImage(id).subscribe(
        response => {
          this.image = response.image;
          if(!response.image){
            this._router.navigate(['/']);
          }
        }, error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        }
      );
    });
  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._imageService.editImage(id,this.image).subscribe(
        response => {
          this.image = response.image;
          if(!response.image){
            alert("Error en el servidor");
          }else{
            console.log("subir imagen");
            this.makeFileRequest(GLOBAL.url+'upload-image/'+id,[],this.filesToUpload)
              .then(
                (result)=>{
                  console.log(result);
                  this.resultUpload = result;
                  this.image.picture = this.resultUpload.filename;
                },
                (err)=>{
                  console.log(err);
                }
              );
          }

          //this._router.navigate(['/album', this.image.album]);
        }, error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        }
      );
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files; //guardar ruta de ficheros a subir
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++){
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
        console.log("por enviar");
        xhr.open('POST', url, true);
        xhr.send(formData);
      }
      console.log("termina");
    });
  }
}