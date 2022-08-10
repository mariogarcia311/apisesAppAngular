import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;
  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    // this.activateRoute.params.subscribe(({ id }) => {
    //   this.paisService.getPaisPorId(id).subscribe((resp) => console.log(resp));
    // });
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorId(id)),
        tap(console.log)
      )
      .subscribe((resp) => {
        this.pais = resp;
      });
  }
}
