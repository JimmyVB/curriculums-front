import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'informacion', component: InformacionPersonalComponent},
  {path: 'experiencia', component: ExperienciaLaboralComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    InformacionPersonalComponent,
    ExperienciaLaboralComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
