import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {routing, appRoutingProviders} from './app.routing';

import {AlbumsListComponent} from './components/albums-list.component';
import {AlbumAddComponent} from './components/album-add.component';
import {AlbumDetailComponent} from './components/album-detail.component';
import {AlbumEditComponent} from './components/album-edit.component';

import {ImageAddComponent} from './components/image-add.component';
import {ImageEditComponent} from './components/image-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumAddComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    ImageAddComponent,
    ImageEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing //es un módulo del framework
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
