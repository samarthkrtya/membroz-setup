import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'bussiness-setup', pathMatch: 'full' },
    {
        path: 'bussiness-setup',
        loadChildren: () => import('./pages/bussiness-setup/bussiness-setup.module').then(m => m.BussinessSetupModule),
    },
    {
        path: 'member-setup',
        loadChildren: () => import('./pages/member-setup/member-setup.module').then(m => m.MemberSetupModule),
    },
    {           // Wildcard Route (--Do not change--)
        path: '**',
        loadChildren: () => import('./pages/not-found-component/not-found-component.module').then(m => m.NotFoundComponentModule),
    },
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);