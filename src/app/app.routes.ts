import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { InvitationComponent } from './invitation/invitation.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'invitation', component: InvitationComponent },
  { path: '**', redirectTo: '' }
];
