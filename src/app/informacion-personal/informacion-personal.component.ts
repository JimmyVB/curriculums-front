import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { CurriculumService } from '../services/curriculum.service';
import Swal from 'sweetalert2';
import { InfoResult } from '../models/infoResult';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  persona: Persona = new Persona;
  infoResult: InfoResult[];

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit(): void {
  }

  crearInformacionPersona(): void {
    console.log(this.persona);
    this.curriculumService.crearInformacionPersonal(this.persona)
      .subscribe(
        () => {
          Swal.fire('Informacion Agregada', `La informacion se ha creado con éxito`, 'success');
        },
        err => {
          resultErrors => this.infoResult = resultErrors["error"]
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }
}
