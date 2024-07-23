import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartProduct, Product } from 'src/app/core/models/object-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem!: CartProduct;
  public cartItems: CartProduct[] = [];

  private cartUpdates = new BehaviorSubject<any>(null);
  public cartUpdates$ = this.cartUpdates.asObservable();

  constructor() {}

  public get count(): number {
    //this.cartUpdates.next(this.cartItems.length.toString());
    return this.cartItems.reduce((c, t1) => t1.qty + c, 0);
    //c in like an increment number start with 0 and then the quantity added to it
    // get items from local storage
    // let localCartItems: CartProduct[] = JSON.parse(
    //   localStorage.getItem('cartItems') || '{}'
    // );
    // console.log(localCartItems);

    // return localCartItems.reduce((c, t1) => t1.qty + c, 0);
  }

  addToCart(productItem: Product) {
    let item: CartProduct = this.cartItems.find(
      (item) => item.id == productItem.id
    ) as CartProduct;

    if (item) {
      item.qty++;
    } else {
      this.cartItem = {
        ...productItem,
        qty: 1,
      };
      this.cartItems.push(this.cartItem);
    }

    // localStorage.setItem("cartItems",JSON.stringify(this.cartItems));
    this.cartUpdates.next(this.cartItems.length.toString());
  }

  public removeFromCart(item: any): void {
    this.cartItems.splice(
      this.cartItems.findIndex((element) => item.id === element.id),
      1
    );

    this.cartUpdates.next(this.cartItems.length.toString());
  }

  chngQuantity(){
    // this.cartUpdates.next(this.cartItems.length.toString());
    return this.count;
  }

  checkoutPreview(){
    this.cartUpdates.next(this.cartItems.length.toString());
    return this.count;
  }
 
}
