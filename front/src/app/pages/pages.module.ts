import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Mediciones
import { MedicionComponent } from './mediciones/medicion.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { EditarmedicionComponent } from './mediciones/editarmedicion.component';

// Planes
import { EditarPlanComponent } from './planes/editar-plan.component';
import { PlanComponent } from './planes/plan.component';
import { PlanesComponent } from './planes/planes.component';

// Caja
import { IngresosComponent } from './caja/ingresos.component';
import { EgresosComponent } from './caja/egresos.component';
import { EgresoComponent } from './caja/egreso.component';
import { IngresoComponent } from './caja/ingreso.component';
import { CajaComponent } from './caja/caja.component';
import { CajasComponent } from './caja/cajas.component';

// Personas
import { ClientesComponent } from './personas/clientes/clientes.component';
import { ClienteComponent } from './personas/clientes/cliente.component';
import { EditarclienteComponent } from './personas/clientes/editarcliente.component';
import { ProfesionalComponent } from './personas//profesionales/profesional.component';
import { ProfesionalesComponent } from './personas//profesionales/profesionales.component';
import { EditarprofesionalComponent } from './personas//profesionales/editarprofesional.component';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { WebcamModule } from 'ngx-webcam';
import { HistoricoComponent } from './asistencias/historico.component';
import { FotografiaComponent } from './personas/clientes/fotografia.component';
import { SettingsComponent } from './settings/settings.component';
import { BackupsComponent } from './settings/backups/backups.component';



@NgModule({
    declarations: [
        PagesComponent,
        // Personas
        ProfesionalesComponent,
        ClientesComponent,
        ClienteComponent,
        ProfesionalComponent,
        EditarprofesionalComponent,
        EditarclienteComponent,
        FotografiaComponent,
        // Cajas
        CajaComponent,
        CajasComponent,
        IngresoComponent,
        IngresosComponent,
        EgresoComponent,
        EgresosComponent,
        // Planes
        PlanesComponent,
        PlanComponent,
        EditarPlanComponent,
        // Mediciones
        MedicionComponent,
        MedicionesComponent,
        EditarmedicionComponent,
        HistoricoComponent,
        // Otros
        AsistenciasComponent,
        GraficasComponent,
        DashboardComponent,
        SettingsComponent,
        BackupsComponent
    ],
    exports: [
        PagesComponent,
        GraficasComponent,
        PlanComponent,
    ],
    imports: [
        WebcamModule,
        SharedModule,
        // SelectModule,
        PAGES_ROUTES,
        // ChartsModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})

export class PagesModule { }
