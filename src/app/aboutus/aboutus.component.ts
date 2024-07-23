import { Component, OnInit } from '@angular/core';
import { AboutusService } from './aboutus.service';
import { AboutUs } from './aboutUs-model';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  aboutusInfo!: AboutUs;
  // servicesType:ServicesType[]=[];
  constructor(private aboutusService: AboutusService) {}
  ngOnInit(): void {
    this.getAboutusInfo();
  }

  getAboutusInfo() {
    this.aboutusService.aboutusInfo().subscribe(
      (data) => {
        this.aboutusInfo = data[0];
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
}
