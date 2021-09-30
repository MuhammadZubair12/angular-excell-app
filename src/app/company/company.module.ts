import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    AgmCoreModule,
    FormsModule
  ]
})
export class CompanyModule { }
