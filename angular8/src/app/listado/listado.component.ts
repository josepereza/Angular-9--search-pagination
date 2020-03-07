import { Component, OnInit } from '@angular/core';
import { ProductosService } from "../productos.service";
import {Product} from "../product";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  term : string;
  p: number = 1;

  profileForm: FormGroup;
  _id = '';
  prod_name = '';
  prod_desc = '';
  prod_price: number = null;
  actualizar:boolean=false;
  
  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private api: ProductosService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required]
    });
this.Lista(); 
    
  }
  Lista(){
    this.api.getProducts()
    .subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
    

  }
  onSubmit() {
    if (this.actualizar){
      
    this.onFormSubmit();
    return
    }else {
    // TODO: Use EventEmitter with form 
    this.api.addProduct(this.profileForm.value)
    .subscribe((res: any) => {
      this.Lista();
    console.log(res);
  })
    }
}
editar(id: any) {
  this.actualizar=true;
  this.api.getProduct(id).subscribe((data: any) => {
    this._id = data._id;
    this.profileForm.setValue({
      prod_name: data.prod_name,
      prod_desc: data.prod_desc,
      prod_price: data.prod_price
    });
  });
}

borrar(id: any) {
  this.isLoadingResults = true;
  this.api.deleteProduct(id)
    .subscribe(res => {
      this.Lista();
        this.isLoadingResults = false;
        
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}

onFormSubmit() {
  this.isLoadingResults = true;
  this.api.updateProduct(this._id, this.profileForm.value)
    .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.actualizar=false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.Lista();

}
}