import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/object-model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  all_product_data: any;
  addEditProductForm!: FormGroup;
  addEditProduct: boolean = false;//for form validation
  popup_header!: string;
  add_product!: boolean;
  edit_product!: boolean;

  product_data!: { name: any; uploadPhoto: any; productDesc: any; kind: any; status: any; price:any};
  product_dto!: Product;

  single_product_data!: { name: any; uploadPhoto: any; productDesc: any; kind: any; status: any; price:any};
  edit_product_id!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private product_service: ProductService) { }

  ngOnInit() {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      kind: ['', Validators.required],
      status: ['', Validators.required]
    })
    this.getAllProduct()
  }

  get rf() { return this.addEditProductForm.controls; }

  get name() {
    return this.addEditProductForm.get('name')!;
  }

  get nickname() {
    return this.addEditProductForm.get('nickname')!;
  }

  get email() {
    return this.addEditProductForm.get('email')!;
  }

  get password() {
    return this.addEditProductForm.get('password')!;
  }

  get mobNumber() {
    return this.addEditProductForm.get('mobNumber')!;
  }
  get age() {
    return this.addEditProductForm.get('age')!;
  }
  get dob() {
    return this.addEditProductForm.get('age')!;
  }
  get addLine1() {
    return this.addEditProductForm.get('addLine1')!;
  }
 get city() {
    return this.addEditProductForm.get('city')!;
  }
 get state() {
    return this.addEditProductForm.get('state')!;
  }
 
 get language() {
    return this.addEditProductForm.get('language')!;
  }
 get gender() {
    return this.addEditProductForm.get('gender')!;
  }

get uploadPhoto() {
    return this.addEditProductForm.get('uploadPhoto')!;
  }
get status() {
    return this.addEditProductForm.get('status')!;
  }
get role() {
    return this.addEditProductForm.get('role')!;
  }
get productDesc() {
    return this.addEditProductForm.get('productDesc')!;
  }
get kind() {
    return this.addEditProductForm.get('kind')!;
  }


  getAllProduct() {
    this.product_service.allProduct().subscribe(data => {
      this.all_product_data = data;
    }, error => {
      console.log("My error", error);
    })
  }

  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      kind: this.product_data.kind,
      status: this.product_data.status,
      price:this.product_data.price
    }
    this.product_service.addNewProduct(this.product_dto).subscribe(data => {
      // console.log(data);
      // jQuery('#addEditProductModal').modal('toggle');
      this.getAllProduct();
    }, err => {
      alert("Some Error Occured");
    })
  }

  editProductPopup(id: string) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.product_service.singleProduct(id).subscribe(data => {
      this.single_product_data = data;
      this.edit_product_id = data.id;
      // console.log("single_product_data", this.single_product_data)
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        // uploadPhoto: '',
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        kind: this.single_product_data.kind,
        status: this.single_product_data.status
      })
    })
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      kind: this.product_data.kind,
      status: this.product_data.status,
      price:this.product_data.price
    }
    this.product_service.updateProduct(this.edit_product_id, this.product_dto).subscribe(data => {
      // console.log(data);
      // jQuery('#addEditProductModal').modal('toggle');
      this.getAllProduct();
    }, err => {
      alert("Some Error Occured");
    })
  }

  deleteProduct(id: string) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.product_service.deleteProduct(id).subscribe(data => {
        console.log("deleted successfully", data);
        this.getAllProduct();
      }, err => {
        alert("Some Error Occured");
      })
    } else {
      alert("You pressed Cancel!");
    }

  }
}
