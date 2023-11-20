import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Componants/login/login.component";
import {HomeComponent} from "./Componants/admin/home/home.component";
import {AdminComponent} from "./Componants/admin/admin.component";
import {ManagementOfCategoriesComponent} from "./Componants/admin/management-of-categories/management-of-categories.component";
import {ManagementOfOrgansComponent} from "./Componants/admin/management-of-organs/management-of-organs.component";

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"admin",component:AdminComponent,
  children:[
    {path:"",component:HomeComponent},
    {path:"categories",component:ManagementOfCategoriesComponent},
    {path:"organs",component:ManagementOfOrgansComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
