import { HttpClient } from '@angular/common/http';
import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private noticiasLeer: Article [] = [];

  constructor(private gestion:GestionStorageService) {
    let promesa: Promise<Article[]>=this.gestion.getObject("noticias");
    promesa.then(datos=>{
      this.noticiasLeer.push(...datos);      
    });
  }

  // Añade una nueva noticia a leer
  addNoticia(item : Article) {
    // copiar item
    let itemString = JSON.stringify(item);
    item = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(item);
    // console.log(this.noticiasLeer);
    this.gestion.setObject("noticias",this.noticiasLeer);
  }

  // Comprueba si una noticia ya está en el array
  buscar(item: Article): number  {
    let articuloEncontrado: any = this.noticiasLeer.find(
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia
  borrarNoticia(item: Article) {
    let indice = this.buscar(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
      // console.log(this.noticiasLeer);
      this.gestion.removeItem("noticias");
      this.gestion.setObject("noticias",this.noticiasLeer); 
    }
  }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.noticiasLeer;
  }
}
