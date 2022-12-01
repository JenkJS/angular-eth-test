import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ConnectComponent} from "./connect/connect.component";

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'connect', component: ConnectComponent },
  { path: '', redirectTo: '/connect', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
