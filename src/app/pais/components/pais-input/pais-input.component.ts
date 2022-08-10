import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();
  termino: string = '';

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(400)).subscribe((valor) => {
      console.log('rsx', valor);
      this.onDebounce.emit(valor);
    });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any) {
    // const valor = event.target.value;
    // console.log(valor);
    // console.log(this.termino);
    this.debouncer.next(this.termino);
  }
}
