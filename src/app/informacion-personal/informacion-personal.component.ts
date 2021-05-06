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
  userId:number;
  resultInformacion: InfoResult[];

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit(): void {
    this.userId = +sessionStorage.getItem('id');
    this.buscarPersonaPorId(this.userId);
  }

  buscarPersonaPorId(id: number): void{
    this.curriculumService.buscarPersonaPorId(id).subscribe(
      resultInformacion => {
        this.resultInformacion = resultInformacion["data"];

        this.persona.id = this.resultInformacion["id"];
        this.persona.nombre = this.resultInformacion["nombre"];
        this.persona.apellido = this.resultInformacion["apellido"];
        this.persona.correo = this.resultInformacion["correo"];
        this.persona.fechaNacimiento = this.resultInformacion["fechaNacimiento"];
        this.persona.lugarNacimiento = this.resultInformacion["lugarNacimiento"];
        this.persona.telefono = this.resultInformacion["telefono"];
        this.persona.tituloProfesional = this.resultInformacion["tituloProfesional"];

        console.log(this.persona);
      }
    );
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


  actualizarInformacionPersona():void{
    this.curriculumService.actualizarInformacionPersonal(this.persona)
      .subscribe(
        () => {
          Swal.fire('Informacion Actualizada', `La informacion se ha actualizado con éxito`, 'success');
        },
        err => {
          resultErrors => this.infoResult = resultErrors["error"]
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }
}
