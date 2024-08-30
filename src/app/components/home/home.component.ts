import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { DietIntakeComponent } from 'src/app/pages/diet-intake/diet-intake.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

  export const homeChildRoutes: Routes = [
    {
      path:'diet-intake',
      component:DietIntakeComponent
    }
    
  ]

