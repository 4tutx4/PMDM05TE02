import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Article } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { GestionStorageService } from 'src/app/services/gestion-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // Creo e inicializo un array vacío
  listaNoticias: Article[] = [];

  constructor(public gestionNoticiasLeer: GestionNoticiasLeerService) {
  }

  

}
