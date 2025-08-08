import { Routes } from '@angular/router';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DriverCardComponent } from './components/driver-card/driver-card.component';
import { formSubmitGuard } from './Guard/form-submit.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'drivers', component: DriverListComponent },
  { path: 'driver', component: DriverCardComponent },
  { path: 'user', component: AddUserComponent,canDeactivate: [formSubmitGuard] }
];