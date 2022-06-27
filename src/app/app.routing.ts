import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SetupComponent } from './setup/setup.component';

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'setup', pathMatch: 'full' },
    { path: 'setup', component: SetupComponent },
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);