import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Creo e inicializo un array vacío
  listaNoticias: Article[] = [];
  respuesta: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;

  constructor(private leerFichero: HttpClient, public gestionNoticiasLeer: GestionNoticiasLeerService) {
    this.cargarFichero(); 
  }

  // Cuando cambia el check, en función de su valor añade o borra la noticia
  check(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
    
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarFichero() {

    let respuesta: Observable<RespuestaNoticias> = this.leerFichero.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=16f4eb2387ad4e2c87d6446955003469");

    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      this.listaNoticias.push(... resp.articles);
    } );
  }

  // Comprueba si una noticia está para leer o no
  seleccionado(item: Article): boolean {
    let indice: number = this.gestionNoticiasLeer.buscar(item);
    if (indice != -1) {
      return true;
    }
    return false; 
  }

  ngOnInit() { 
  }
}
