import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { MemberSetupComponent } from './member-setup.component';

const routes: Routes = [
  { path : '' , component : MemberSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberSetupRoutingModule { }
