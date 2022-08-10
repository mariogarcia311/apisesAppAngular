import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [],
})
export class PorRegionComponent implements OnInit {
  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  constructor(private paisService: PaisService) {}

  getClaseCss(region: string) {
    return region === this.regionActiva
      ? 'btn btn-info me-1'
      : 'btn btn-outline-info me-1';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    this.paises = [];
    console.log(region);
    this.paisService.getPaisPorRegion(region).subscribe((paises) => {
      this.paises = paises;
    });
  }

  ngOnInit(): void {}
}
