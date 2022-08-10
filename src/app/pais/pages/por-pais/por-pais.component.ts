import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  sugerido: string = '';

  buscar(termino: string) {
    console.log(termino);
    this.sugerido = '';
    this.paisesSugeridos = [];
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        console.log(paises);
        this.paises = paises;
      },
      (err) => {
        console.log('error');
        this.paises = [];
        this.hayError = true;
      }
    );
  }

  recomendacion(termino: string) {
    this.paisesSugeridos = [];
    this.sugerido = termino;
    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 3);
      },
      (err) => (this.paisesSugeridos = [])
    );
  }
  constructor(private paisService: PaisService) {}
}
