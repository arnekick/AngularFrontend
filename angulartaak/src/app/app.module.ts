import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { RegistreerComponent } from './registreer/registreer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NieuweLijstComponent } from './nieuwe-lijst/nieuwe-lijst.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistreerComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'nieuweLijst', component: NieuweLijstComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistreerComponent,
    DashboardComponent,
    NieuweLijstComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
