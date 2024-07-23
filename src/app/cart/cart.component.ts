import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import {  Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCartComponent } from './dialog-cart/dialog-cart.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public count: number = 0;
  user_id: any;
  // showItems = false;
  constructor(
    public cartService: CartService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartService.cartUpdates$.subscribe(() => {
      this.count = this.cartService.count;
    });
  }

  public removeProduct(item: any): void {
    this.cartService.removeFromCart(item);
    this.count = this.cartService.count;
  }
  public chngQuantity(): void {
    // this.count = this.cartService.count;
    this.count = this.cartService.chngQuantity();
  }

  preview() {
    this.user_id = Number(sessionStorage.getItem('user_session_id'));

    if (this.user_id == 0) {
      const dialogRef = this.dialog.open(DialogCartComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        if (result) {
          this.router.navigate(['/sign-in']);
        }
      });
    } else {
      this.cartService.checkoutPreview();
      this.router.navigate(['/checkout']);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
