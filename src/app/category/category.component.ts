import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../core/models/object-model';
import { PageEvent } from '@angular/material/paginator';
import { left } from '@popperjs/core';
import { CartService } from '../shared/services/cart.service';
//import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  kind: string = '';
  menArr = [];
  womenArr = [];
  kidsArr = [];
  eccArr = [];

  startIndex = 0;
  endIndex = 6;
  MaxLength!: number;

  categoryArr!: Product[];
  filteredcategoryArr: Product[] = [];
  singleProduct!: Product;

  cartItems: any = [];
  showpageniator: boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.kind = this.route.snapshot.params['name'];
    this.route.params.subscribe((params: Params) => {
      this.kind = params['name'];
    });
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.allProduct().subscribe((data) => {
      this.menArr = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Men')
      );
      this.womenArr = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Women')
      );
      this.kidsArr = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Kids')
      );
      this.eccArr = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Accessories')
      );
      this.sortViaKind(this.startIndex, this.endIndex);
    });
  }
  sortViaKind(startIndex: number, endIndex: number) {
    if (this.kind === 'Men') {
      // this.categoryArr = this.menArr.slice();
      this.categoryArr = this.menArr.slice(startIndex, endIndex);
      this.MaxLength = this.menArr.length;
    }
    if (this.kind === 'Women') {
      this.categoryArr = this.womenArr.slice(startIndex, endIndex);
      this.MaxLength = this.womenArr.length;
    }
    if (this.kind === 'Kids') {
      // this.categoryArr = this.kidsArr.slice();
      this.categoryArr = this.kidsArr.slice(startIndex, endIndex);
      this.MaxLength = this.kidsArr.length;
    }
    if (this.kind === 'Accessories') {
      // this.categoryArr = this.eccArr.slice();
      this.categoryArr = this.eccArr.slice(startIndex, endIndex);
      this.MaxLength = this.eccArr.length;
    }
    this.filteredcategoryArr = this.categoryArr;
    if (this.categoryArr.length != 0) {
      this.showpageniator = true;
    }
  }
  moreElement() {
    if (this.startIndex >= 0 && this.endIndex < this.MaxLength) {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + 6;
      this.sortViaKind(this.startIndex, this.endIndex);
    }
  }

  lessElement() {
    if (this.startIndex > 0) {
      this.endIndex = this.startIndex;
      this.startIndex = this.endIndex - 6;
      this.sortViaKind(this.startIndex, this.endIndex);
    }
  }

  addToCart(productItem: any) {
    this.cartService.addToCart(productItem);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredcategoryArr = this.categoryArr;
      return;
    }

    this.filteredcategoryArr = this.categoryArr.filter((productItem) =>
      productItem?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
