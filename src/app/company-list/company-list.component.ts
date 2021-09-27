import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  Record :any=[];

  constructor(
    private companyservice: CompanyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.companyservice.getCompany().subscribe((res) => {
      console.log(res)
      this.Record = res;
    })
  }

  editCompany(value: any): any {
    this.router.navigate([`/app/company/${value}`]);
  }

}
