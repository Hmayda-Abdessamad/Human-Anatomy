import {  Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Organ } from "../../../Models/organ";
import { OrgansService } from "../../../Services/organs.service";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-management-of-organs',
    templateUrl: './management-of-organs.component.html',
    styleUrls: ['./management-of-organs.component.css']
})
export class ManagementOfOrgansComponent implements OnInit, OnChanges {

    msgErr!: string;
    organs!: Organ[];
    url = 'http://localhost:8080/api/v1/user/img/download/';
    selectedRow: Organ | undefined = {} as Organ;
    searchForm!:FormGroup
    @ViewChild('searchInput') searchInput!: ElementRef;

    constructor(private service: OrgansService,private formBuilder:FormBuilder) {}

    ngOnInit(): void {
        this.getAllOrgans();
        this.searchForm=this.formBuilder.group({
            mot:this.formBuilder.control("",[Validators.required])
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getAllOrgans();
    }

    getAllOrgans() {
        this.service.getOrgans().subscribe({
            next: (data) => {
                this.organs = data;
            },
            error: (err: any) => {
                this.msgErr = err;
            }
        });
    }

    setSelectedOrgan(id: number) {
        this.selectedRow = this.organs.find(item => item.id === id);

    }



}
