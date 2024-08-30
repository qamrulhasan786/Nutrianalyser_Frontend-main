import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeChildRoutes, HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DietIntakeComponent } from './pages/diet-intake/diet-intake.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: homeChildRoutes,
    canActivate: [AuthService]
  },
  {
    path: '',
    component: HomePageComponent
  },
  
  {
    path: 'dashboard',
    component: DashboardComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
