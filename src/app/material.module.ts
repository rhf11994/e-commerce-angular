import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
