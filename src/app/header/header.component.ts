import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../seguridad/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:string = 'Curriculums Vitae'

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesion con exito`, 'success');
    this.router.navigate(['/login']);
}
}
