import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/object-model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  kind: string = '';
  // menArr = [];
  // womenArr = [];
  // kidsArr = [];
  // eccArr = [];

  startIndex = 0;
  endIndex = 6;
  MaxLength!: number;

  //categoryArr!: Product[];
  sliderMen = [];
  sliderWomen = [];
  sliderKids = [];

  slidesMen: any = [[]];
  slidesWomen: any = [[]];
  slideskids: any = [[]];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.allProduct().subscribe((data) => {
      this.sliderMen = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Men')
      );
      this.sliderWomen = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Women')
      );
      this.sliderKids = data.filter((s: { kind: string | string[] }) =>
        s.kind.includes('Kids')
      );
      // this.eccArr = data.filter((s: { kind: string | string[] }) =>
      //   s.kind.includes('Accessories')
      // );
      // this.sortViaKind();
      // this.categoryArr=data;
      // console.log(this.kind);
      // console.log(this.sliderMen);
      this.slidesMen = this.chunk(this.sliderMen, 3);
      this.slidesWomen = this.chunk(this.sliderWomen, 3);
      this.slideskids = this.chunk(this.sliderKids, 3);
    });
  }

  chunk(arr: string | any[], chunkSize: number) {
    let R = [];

    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }

    return R;
  }

  // ngOnInit() {
  //   this.slidesMen = this.chunk(this.sliderMen, 3);
  //   this.slidesWomen = this.chunk(this.sliderWomen, 3);
  //   this.slideskids = this.chunk(this.sliderKids, 3);
  // }
}
