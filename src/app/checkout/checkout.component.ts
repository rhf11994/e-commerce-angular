import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct, Order, Product } from '../core/models/object-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  orderForm!: FormGroup;
  orderCheck = false;
  orderFormData: any;
  order!: Order;
  cartItem!: CartProduct[];

  dateTime = new Date();
  user_id: any;
  totalPrice: number = 0;
  shipping: number = 10;

  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cartItem = this.cartService.cartItems;

    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });

    this.getTotalPrice();
  }

  getTotalPrice() {
    let price = 0;
    this.cartItem.forEach((element) => {
      price += +element.price * +element.qty;
    });

    this.totalPrice = price + 10;
  }
  get name() {
    return this.orderForm.get('name')!;
  }
  get contact() {
    return this.orderForm.get('contact')!;
  }
  get email() {
    return this.orderForm.get('email')!;
  }
  get addLine1() {
    return this.orderForm.get('addLine1')!;
  }
  get addLine2() {
    return this.orderForm.get('addLine1')!;
  }
  get city() {
    return this.orderForm.get('city')!;
  }
  get state() {
    return this.orderForm.get('state')!;
  }
  get zipCode() {
    return this.orderForm.get('zipCode')!;
  }

  addOrder() {
    this.user_id = Number(sessionStorage.getItem('user_session_id'));

    if (this.user_id == 0) {
      alert('kindly sign in');
    } else {
      this.orderFormData = this.orderForm.value;
      this.order = {
        id: 1,
        userId: this.user_id,
        contact: this.orderFormData.contact,
        name: this.orderFormData.name,
        dateTime: this.dateTime.toString(),
        email: this.orderFormData.email,
        deliveryAddress: {
          id: 0,
          addLine1: this.orderFormData.addLine1,
          addLine2: this.orderFormData.addLine2,
          city: this.orderFormData.city,
          state: this.orderFormData.state,
          zipCode: this.orderFormData.zipCode,
        },
        totalPrice: 0,
      };
      
    }

    this.orderCheck = true;

    // if (this.orderForm.invalid) {
    //   //this.toastr.error('Some Error Occured!', 'User Profile!');
    //   alert('Error!! :-)\n\n' + JSON.stringify(this.orderForm.value));
    //   return;
    // }
  }
}
