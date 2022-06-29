import { Routes, RouterModule } from '@angular/router';
import { BussinessSetupComponent } from './bussiness-setup.component';

const routes: Routes = [
  { path: '', component: BussinessSetupComponent },
  { path: ':id', component: BussinessSetupComponent },
];
export const routing = RouterModule.forChild(routes);