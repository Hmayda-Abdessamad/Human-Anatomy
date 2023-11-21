import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Organ } from "../../../Models/organ";
import { OrgansService } from "../../../Services/organs.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ModelViewerElement} from "@google/model-viewer";

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
    modelBlobURL: string = ''; // Variable to store the generated Blob URL
    isLoading: boolean = true;
    @ViewChild('searchInput') searchInput!: ElementRef;
    @ViewChild('modelViewer') modelViewer!: ElementRef<ModelViewerElement>;

    constructor(private service: OrgansService,private formBuilder:FormBuilder,private http:HttpClient) {}

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


        this.http.get(this.url+this.selectedRow?.data, { responseType: 'arraybuffer' })
            .subscribe(
                (data: ArrayBuffer) => {
                    const blob = new Blob([data], { type: 'model/gltf-binary' });
                    this.modelBlobURL = URL.createObjectURL(blob);
                    this.isLoading = false;

                    // After obtaining the model URL, load it into the model-viewer element
                    if (this.modelBlobURL && this.modelViewer) {
                        this.modelViewer.nativeElement.src = this.modelBlobURL;
                    }
                },
                (error: any) => {
                    console.error('Error fetching model data:', error);
                    this.isLoading = false;
                }
            );
    }
    deleteOrgan(id: number) {

    }
}
