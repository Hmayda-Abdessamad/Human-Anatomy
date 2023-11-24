import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Categorie} from "../../../Models/categorie";
import {CategoriesService} from "../../../Services/categories.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import 'bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";





@Component({
  selector: 'app-management-of-categories',
  templateUrl: './management-of-categories.component.html',
  styleUrls: ['./management-of-categories.component.css'],

})
export class ManagementOfCategoriesComponent implements OnInit ,AfterViewInit,OnChanges{

    msgErr!:string
    categories!:Categorie[]
    displayedColumns: string[] = ['Id', 'Name', 'Image', 'Description','Actions'];
    url= 'http://localhost:8080/api/v1/files/download/';
    dataSource = new MatTableDataSource(this.categories);
    selectedRow:Categorie={} as Categorie
    AddForm!:FormGroup;
    EditForm!:FormGroup;
    searchForm!:FormGroup
    @ViewChild('searchInput') searchInput!: ElementRef;
  // Add a property to track image loading

    @ViewChild(MatPaginator) paginator!: MatPaginator
    // Add the ViewChild decorator to get a reference to the deleteConfirmationModal
    @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: MatDialog;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginator.pageSize = 4
    }
    constructor(private service:CategoriesService,private formBuilder:FormBuilder) {
     }
    ngOnInit(): void {
        this.EditForm=this.formBuilder.group({
            id:this.formBuilder.control([Validators.required]),
            name:this.formBuilder.control([Validators.required]),
            description:this.formBuilder.control([Validators.required])
        })

        this.AddForm=this.formBuilder.group({
            id:this.formBuilder.control("",[Validators.required]),
            name:this.formBuilder.control("",[Validators.required]),
            description:this.formBuilder.control("",[Validators.required]),
            image:this.formBuilder.control([Validators.required])
        })

        this.searchForm=this.formBuilder.group({
            mot:this.formBuilder.control("",[Validators.required])
        })
        this.getAllCategories()
     }


     getAllCategories(){
      this.service.getCategories().subscribe({
          next:(data)=>{
              this.categories=data
              this.dataSource=new MatTableDataSource(this.categories)
              this.dataSource.paginator=this.paginator

          },
          error:(err:any)=>{
              this.msgErr=err
          }
      })
  }
    SetSelectedRow(element: any) {
     this.selectedRow=element
        this.EditForm.get('name')?.setValue(this.selectedRow.name);
        this.EditForm.get('description')?.setValue(this.selectedRow.description);
        this.EditForm.get('id')?.setValue(this.selectedRow.id);
    }

    deleteCategory() {
        this.service.deleteCategory(this.selectedRow.id).subscribe(
            (response) => {
                this.categories = this.categories.filter(category => category.id !== this.selectedRow.id);
                // Update the data source and refresh the table
                this.dataSource.data = this.categories;
                this.dataSource.paginator = this.paginator;
            },
            (error) => {
                console.error('Error:', error);
            }
        );

    }

      selectedImage: File | null = null;

  // Function to handle file selection
  onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }

  }
  onFileChanged2(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const imageFile = input.files[0];
            this.AddForm.get('image')?.setValue(imageFile);
        }
    }

  // Function to get the URL of the selected image


  getImageUrl(image: File): string {
    return URL.createObjectURL(image);
  }
  setImageToNull(){
    this.selectedImage= null ;
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) {
      input.value = ''; // Clear the input value
    }
  }


     editCategory(id: number) {

    var  updatedData:Categorie = {
      id: id,
      name: this.EditForm.value.name,
      description: this.EditForm.value.description
    };

    this.service.editCategory( updatedData).subscribe(
      (response) => {
        // Handle successful update response
        console.log('Category updated:', response);

        if(this.selectedImage){
            this.service.updateImageCategory(id, this.selectedImage).subscribe(
                (response) => {
                    // Handle successful image update response
                    console.log('Image updated:', response);

                    // Now perform the category update after the image update
                },
                (error) => {
                    // Handle error response for image update
                    console.error('Error updating image:', error);

                }
            );
        }
      },
      (error) => {
        // Handle error response
        console.error('Error updating category:', error);
      }
    );

      window.location.reload();
  }

      ngOnChanges(changes: SimpleChanges): void {
      this.getAllCategories()
     }

     addCategory() {

        const { name, description, image } = this.AddForm.value;

        if (image && name && description) {
            this.service.addCategory(image, name, description).subscribe(
                (response) => {
                    console.log('Category added successfully:', response);
                    window.location.reload()

                },
                (error) => {
                    console.error('Error adding category:', error);
                    // Handle error responses
                    window.location.reload()
                }
            );
        } else {
            // Handle validation errors or missing data
        }


     }

    search() {
        const searchTerm = this.searchForm.value.mot.toLowerCase().trim();

        // Clone the original categories array to avoid direct mutation
        const filteredData = this.categories.filter(item => item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)) ;

        // Assign the filtered data to the MatTableDataSource
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.paginator = this.paginator;
    }

}

