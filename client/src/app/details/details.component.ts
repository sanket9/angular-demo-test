import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiserviceService } from "../apiservice.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  detailsList: any;
  displayedColumns = [
    "id", 'name', 'father_name', 'email', 'phone', 'address', 'actions'
  ]
  userDetailsForm: FormGroup;
  dataSource = new MatTableDataSource<Element>();
  // selection = new SelectionModel<Element>(true, []);
  id:number = null;
  constructor(public apiService: ApiserviceService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.getAllList();
    this.createForm()
  }

  ngAfterViewInit() {
    // console.log(this.sort);
    
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllList(){
    this.apiService.getAllList().subscribe((data: any)=> {
      // console.log(data);
      if(data.status == 200){
        this.dataSource.data = data.list
      }
    })
  }

  createForm() {
    this.userDetailsForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      fathername: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
    })
    
    // console.log(this.userDetailsForm.controls['email']);
     
  }
  selecteditStaff(element) {
    // console.log(element);
    this.userDetailsForm.patchValue({
      name: element.name,
      fathername: element.father_name,
      email: element.email,
      phone: element.phone,
      street: element.address.street,
      city: element.address.city,
      country: element.address.country

    })
    this.id = element._id
  }

  onSubmit(values: any){

    values.id = JSON.parse(localStorage.getItem('user-data'))._id
    values.address = {
      street: values.street,
      city: values.city,
      country: values.country
    } 
    // console.log("form", values);

    this.apiService.onAddData(values).subscribe((data:any) => {
      // console.log(data);
      if (data.status == 200) {
        this.getAllList();
        this.openSnackBar(data.message, "close")
      }else{
        this.openSnackBar(data.message, "close")
      }
      
    })
  }
  onUpdate(values: any){
    // console.log(values);
    values.address = {
      street: values.street,
      city: values.city,
      country: values.country
    } 
    values._id = this.id;
    // console.log("form", values);

    this.apiService.onEditData(values).subscribe((data:any) => {
      // console.log(data);
      if (data.status == 200) {
        this.getAllList();
        this.openSnackBar(data.message, "close")
      }else{
        this.openSnackBar(data.message, "close")
      }
      
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  delete(id) {
    if (confirm('Do you want to delete it?')) {
      
      this.apiService.onDelete(id).subscribe((data: any)=> {
        // console.log(data);
        if(data.status == 200){
          this.getAllList();
          this.openSnackBar(data.message, "close")
        }
      })
    }
  }
}

export interface PeriodicElement {
  name: string;
  father_name: string;
  phone: number;
  email: string;
  address: string;
  actions: string;
}
