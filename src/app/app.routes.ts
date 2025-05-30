import { Routes } from '@angular/router';
import { LayoutComponent } from './Modules/layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/layout', pathMatch: 'full' },
    { path: 'layout', component: LayoutComponent },
];
