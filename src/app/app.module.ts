import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcellSheetComponent } from './excell-sheet/excell-sheet.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IndexComponent } from './index/index.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { UIModule } from './ui/ui.module';
import { CompanyListComponent } from './company-list/company-list.component';

import { AgmCoreModule } from '@agm/core';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ExcellSheetComponent,
    IndexComponent,
    SidemenuComponent,
    CompanyComponent,
    HeaderComponent,
    CompanyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMessageModule,
    NzUploadModule,
    NzTableModule,
    SharedModule,
    UIModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcG_aO4b4gYOe1Pu--a-eDfd8vgptuET0',
      libraries: ['places']
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
