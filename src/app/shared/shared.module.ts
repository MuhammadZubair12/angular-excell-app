import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RoundtoPipe } from '../pipes/roundto.pipe';

const modules = [
  CommonModule,
  UIModule,
  FormsModule,
  ReactiveFormsModule,
];

const declarations = [
  // RoundtoPipe
];

@NgModule({
  // declarations,
  imports: modules,
  exports: [... modules]
})
export class SharedModule { }
