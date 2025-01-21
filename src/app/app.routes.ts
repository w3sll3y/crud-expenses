import { Routes } from '@angular/router';
import { RegistrationCostsComponent } from './components/registration-costs/registration-costs.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateRegistrationCostsComponent } from './components/uppdate-registration-costs/update-registration-costs.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegistrationCostsComponent,
  },
  {
    path: "update",
    component: UpdateRegistrationCostsComponent,
  },
];
