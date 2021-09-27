import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyComponent } from './company/company.component';
import { ExcellSheetComponent } from './excell-sheet/excell-sheet.component';
import { IndexComponent } from './index/index.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

const routes: Routes = [  
  // {path:'', component: IndexComponent},



  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: IndexComponent,
    children: [
      {path:'excell', component: ExcellSheetComponent},
      {path:'company', component: CompanyComponent},
      {path:'company/:id', component: CompanyComponent},
      {path:'company-list', component: CompanyListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
