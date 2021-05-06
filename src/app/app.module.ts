import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { LoginComponent } from './seguridad/usuarios/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'curriculum', component: BodyComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    InformacionPersonalComponent,
    ExperienciaLaboralComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
