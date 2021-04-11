import { Routes } from '@angular/router';
import { MainContentComponent } from './modules/components/dashboard/main-content/main-content.component';


export const ROUTES: Routes = [
    { path: 'dashboard', component: MainContentComponent },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];
