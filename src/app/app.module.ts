import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DietIntakeComponent } from './pages/diet-intake/diet-intake.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { LoadingScreenInterceptor } from "./helpers/loading.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePageComponent,
    DietIntakeComponent,
    DashboardComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    CommonModule,AutocompleteLibModule
  ],
   
  bootstrap: [AppComponent],
  providers: [AuthService,
		UserService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingScreenInterceptor,
			multi: true
		}],
	 
})
export class AppModule { }
