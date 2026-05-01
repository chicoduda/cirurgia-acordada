import { Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PerguntasComponent } from './pages/perguntas/perguntas.component';
import { HistoricoComponent } from './pages/historico/historico.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'perguntas', component: PerguntasComponent },
  { path: 'historico', component: HistoricoComponent }
];