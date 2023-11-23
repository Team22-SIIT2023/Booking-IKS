import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {component: WineComponent, path:"wine"},
  // {component: HomeComponent, path:"home"},
  // {component: CreateWineComponent, path:"create"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
