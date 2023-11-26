import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Componants/landing-page/landing-page.component';
import { LoginComponent } from './Componants/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './Componants/admin/home/home.component';
import { AdminComponent } from './Componants/admin/admin.component';
import { DataTablesModule } from "angular-datatables";
import { ManagementOfCategoriesComponent } from './Componants/admin/management-of-categories/management-of-categories.component';
import {CategoriesService} from "./Services/categories.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ManagementOfOrgansComponent} from "./Componants/admin/management-of-organs/management-of-organs.component";




@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ManagementOfCategoriesComponent,
    ManagementOfOrgansComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        DataTablesModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NgbDropdownModule,
        FormsModule

    ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
