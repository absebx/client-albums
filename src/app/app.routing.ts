import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AlbumsListComponent} from './components/albums-list.component';
import {AlbumAddComponent} from './components/album-add.component';
const appRoutes: Routes = [
  {path: '', component: AlbumsListComponent},
  {path: 'add-album', component: AlbumAddComponent},
  {path: '**', component: AlbumsListComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);