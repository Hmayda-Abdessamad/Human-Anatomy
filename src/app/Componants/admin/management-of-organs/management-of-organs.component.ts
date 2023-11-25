import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Organ } from "../../../Models/organ";
import { OrgansService } from "../../../Services/organs.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ModelViewerElement} from "@google/model-viewer";
import {iterator} from "rxjs/internal/symbol/iterator";
import {CategoriesService} from "../../../Services/categories.service";
import {Categorie} from "../../../Models/categorie";

@Component({
    selector: 'app-management-of-organs',
    templateUrl: './management-of-organs.component.html',
    styleUrls: ['./management-of-organs.component.css']
})
export class ManagementOfOrgansComponent implements OnInit, OnChanges {

    msgErr!: string;
    organs!: Organ[];
    categories!:Categorie[];
    url = 'http://localhost:8080/api/v1/files/download/';
    selectedRow: Organ | undefined = {} as Organ;
    searchForm!:FormGroup
    addForm!:FormGroup
    editForm!: FormGroup;
    modelBlobURL: string = ''; // Variable to store the generated Blob URL
    isLoading: boolean = true;
    @ViewChild('searchInput') searchInput!: ElementRef;
    @ViewChild('modelViewer') modelViewer!: ElementRef<ModelViewerElement>;


    constructor(private service: OrgansService,private formBuilder:FormBuilder,private http:HttpClient,private categorieService:CategoriesService) {}

    ngOnInit(): void {
        this.getAllOrgans();

        this.searchForm=this.formBuilder.group({
            mot:this.formBuilder.control("",[Validators.required])
        })

        this.addForm=this.formBuilder.group({

            name:this.formBuilder.control("",[Validators.required]),
            description:this.formBuilder.control("",[Validators.required]),
            categorie:this.formBuilder.control("",[Validators.required]),
            img:this.formBuilder.control([Validators.required]),
            data:this.formBuilder.control([Validators.required])
        })


        this.editForm=this.formBuilder.group({
            id:this.formBuilder.control([Validators.required]),
            name:this.formBuilder.control([Validators.required]),
            description:this.formBuilder.control([Validators.required]),
            categorie:this.formBuilder.control([Validators.required]),
            img:this.formBuilder.control([Validators.required]),
            data:this.formBuilder.control([Validators.required])
        })

        this.categorieService.getCategories().subscribe({
            next:(data)=>{
                this.categories=data
            },
            error:(err)=>{
                console.log("can't get the list of categories ")
            }
        })
    }



    OnImgLoad(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const imageFile = input.files[0];
            this.addForm.get('img')?.setValue(imageFile);
        }
    }
    onGblLoad(event:Event){
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const imageFile = input.files[0];
            this.addForm.get('data')?.setValue(imageFile);
        }
    }
    addOrgan(){

        const { name, description,categorie, img,data } = this.addForm.value;

        if (img && name && description && categorie && data) {
            this.service.addOrgan(categorie, name, description,img,data).subscribe(
                (response) => {
                    console.log('Category added successfully:', response);
                    this.addForm.reset()
                },
                (error) => {
                    console.error('Error adding category:', error);
                    // Handle error responses

                }
            );
        } else {
            console.log("missing data")
        }

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
    setOrgan(id:number){
        this.selectedRow=this.organs.find(item=>item.id==id)
        console.log(this.selectedRow)

    }




    ShowModalEdit(id:number){
        this.setOrgan(id)
       this.setSelectedOrgan(id)
        this.editForm.get('name')?.setValue(this.selectedRow?.name);
        this.editForm.get('description')?.setValue(this.selectedRow?.description);
        this.editForm.get('idCat')?.setValue(this.selectedRow?.categorie);
        this.editForm.get('id')?.setValue(this.selectedRow?.id);
    }
    deleteOrgan() {

        if(this.selectedRow){
            this.service.deleteOrgan(this.selectedRow.id).subscribe({
                next:(data)=>{
                    console.log("organ deleted")

                },
                error:(err)=>{
                    console.log("can't delete organ")
                }
            })
        }

        window.location.reload()
    }

    editOrgan() {
        if(this.selectedRow){
            console.log(this.selectedRow?.id)
        }


    }
}
