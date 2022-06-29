import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'bussiness-setup', pathMatch: 'full' },
    {
        path: 'bussiness-setup',
        loadChildren: () => import('./bussiness-setup/bussiness-setup.module').then(m => m.BussinessSetupModule),
    },
    {
        path: 'member-setup',
        loadChildren: () => import('./member-setup/member-setup.module').then(m => m.MemberSetupModule),
    },
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);