import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartProduct, Product } from 'src/app/core/models/object-model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  id: any;
  singleProduct!: Product;
  imgArr = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.productService.singleProduct(this.id).subscribe((data) => {
      this.singleProduct = data;
      this.imgArr = data.uploadPhoto;
    });
  }

  addToCart(productItem: Product) {
    this.cartService.addToCart(productItem);
  }
}
