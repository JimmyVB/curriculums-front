import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { CurriculumService } from '../services/curriculum.service';
import Swal from 'sweetalert2';
import { InfoResult } from '../models/infoResult';
import { HttpEventType } from '@angular/common/http';
import { FotoService } from '../services/foto.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;
  infoResult: InfoResult[];
  userId:number;
  resultInformacion: InfoResult[];
  fotoSeleccionada: File;
  progreso: number=0 ;

  constructor(private curriculumService: CurriculumService,
    private fotoService: FotoService) { }

  ngOnInit(): void {
    this.userId = +sessionStorage.getItem('id');
    this.usuario.id = this.userId;
    console.log(this.usuario.id);

    this.persona.usuario = this.usuario;
    this.buscarPersonaPorId(this.userId);
  }

  buscarPersonaPorId(id: number): void{
    this.curriculumService.buscarPersonaPorId(id).subscribe(
      resultInformacion => {
        this.resultInformacion = resultInformacion["data"];

        console.log(this.resultInformacion);
        this.persona.id = this.resultInformacion["id"];
        this.persona.nombre = this.resultInformacion["nombre"];
        this.persona.apellido = this.resultInformacion["apellido"];
        this.persona.correo = this.resultInformacion["correo"];
        this.persona.fechaNacimiento = this.resultInformacion["fechaNacimiento"];
        this.persona.lugarNacimiento = this.resultInformacion["lugarNacimiento"];
        this.persona.telefono = this.resultInformacion["telefono"];
        this.persona.tituloProfesional = this.resultInformacion["tituloProfesional"];
        this.persona.foto = this.resultInformacion["foto"];
        this.persona.usuario.id = this.resultInformacion["id"];
        console.log("55");
        console.log(this.persona);
      }
    );
  }

  crearInformacionPersona(): void {
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

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      console.log("FOTO 1");
      this.fotoService.subirFoto(this.fotoSeleccionada, this.persona.id)
      .subscribe(event =>{
        if(event.type === HttpEventType.UploadProgress){
          console.log("FOTO 2");
          this.progreso = Math.round((event.loaded/event.total)*100);
        } else if(event.type === HttpEventType.Response){
          console.log("FOTO 3");
          let response: any = event.body;
          this.persona = response.cliente as Persona;
          Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
        }
        //this.cliente = cliente;
      })
    }
  }
}
