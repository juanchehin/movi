import { RouterModule, Routes } from '@angular/router';


import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './shared/login/login.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    // Visible al usuario

    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
