import { Component, OnInit } from '@angular/core';
import { InfoResult } from '../models/infoResult';
import { CurriculumService } from '../services/curriculum.service';
import Swal from 'sweetalert2';
import { ExperienciasLaborales } from '../models/experienciasLaborales';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExperienciaLaboral } from '../models/experienciaLaboral';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  infoResult: InfoResult[];
  expLaboral: ExperienciaLaboral = new ExperienciaLaboral;
  expsLaborals: ExperienciasLaborales = new ExperienciasLaborales;
  formulario: FormGroup;
  userId:number;
  usuario: Usuario = new Usuario;

  constructor(private curriculumService: CurriculumService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userId = +sessionStorage.getItem('id');
    this.usuario.id = this.userId;
    this.crearFormulario();
    this.anadirExperienciaLaboral();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      experienciaLaboral: this.fb.array([])
    });
  }

  get experienciaLaboral(): FormArray {
    return this.formulario.get('experienciaLaboral') as FormArray;
  }

  anadirExperienciaLaboral() {
    const trabajo = this.fb.group({
      empresa: new FormControl(''),
      puesto: new FormControl(''),
      descripcion: new FormControl(''),
      fechaInicio: new FormControl(''),
      fechaFin: new FormControl('')

    });
  
    this.experienciaLaboral.push(trabajo);
  }

  borrarTrabajo(indice: number) {
    this.experienciaLaboral.removeAt(indice);
  }
  
  crearExperienciaLaboral(): void {
    let datos = this.formulario.get('experienciaLaboral').value
    for (var val of datos) {
      this.expLaboral = new ExperienciaLaboral;
      this.expLaboral.empresa = val["empresa"];
      this.expLaboral.puesto = val["puesto"];
      this.expLaboral.descripcion = val["descripcion"];
      this.expLaboral.fechaInicio = val["fechaInicio"];
      this.expLaboral.fechaFin = val["fechaFin"];

      this.expLaboral.usuario = this.usuario;
      this.expsLaborals.experiencia.push(this.expLaboral)
    }
    this.curriculumService.crearExperienciaLaboral(this.expsLaborals)
      .subscribe(
        () => {
          Swal.fire('Experiencia Laboral Agregada', `La experiencia laboral se ha creado con éxito`, 'success');
          this.expsLaborals.experiencia= [];
        },
        err => {
          resultErrors => this.infoResult = resultErrors["error"]
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }

}
