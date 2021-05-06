import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../models/persona';
import { CurriculumService } from '../services/curriculum.service';

@Component({
  selector: 'app-informacion-completa',
  templateUrl: './informacion-completa.component.html',
  styleUrls: ['./informacion-completa.component.css']
})
export class InformacionCompletaComponent implements OnInit {

  persona: Persona = new Persona;
  valor: {nombre: string};


  constructor(private rutaActiva: ActivatedRoute,
    private curriculumService: CurriculumService) { }

  ngOnInit(): void {
    this.valor = {
      nombre: this.rutaActiva.snapshot.params.nombre,
    };

    console.log(this.valor)
  }

}
