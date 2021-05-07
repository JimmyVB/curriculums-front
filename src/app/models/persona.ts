import { Usuario } from "./Usuario";

export class Persona {
    id: number;
    nombre: string;
    apellido: string;
    tituloProfesional: string;
    lugarNacimiento: string;
    telefono: string;
    fechaNacimiento: Date;
    correo: string;
    foto: string;
    usuario: Usuario;
}