import { Component, OnInit } from '@angular/core';
import { InfoResult } from '../models/infoResult';
import { CurriculumService } from '../services/curriculum.service';
import Swal from 'sweetalert2';
import { ExperienciaLaboral } from '../models/experienciaLaboral';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  infoResult: InfoResult[];
  experienciaLaboral: ExperienciaLaboral = new ExperienciaLaboral;

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit(): void {
  }

  crearExperienciaLaboral(): void {
    console.log(this.experienciaLaboral);
    this.curriculumService.crearExperienciaLaboral(this.experienciaLaboral)
      .subscribe(
        () => {
          Swal.fire('Experiencia Laboral Agregada', `La experiencia laboral se ha creado con éxito`, 'success');
        },
        err => {
          resultErrors => this.infoResult = resultErrors["error"]
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }

}
