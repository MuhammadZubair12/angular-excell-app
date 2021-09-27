import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toNumber } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CompanyService } from './company.service';
import { CompList } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public companyFormGroup: FormGroup = new FormGroup({});
  public id:any;
  public isEdit=false;


  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private message:NzMessageService,
    private companyservice: CompanyService
  ) { }
  saveForm(): any {
    if (this.isEdit === false) {
      this.companyservice.createCompany(this.companyFormGroup.value)
      .subscribe(
        result => {
          this.message.success("Company Record Added Successfully")
        },
        error => {
          this.message.error("Something went wrong!!!")
        }
      )
    } else {
      this.companyservice.updateCompany(this.id, this.companyFormGroup.value)
      .subscribe(result => {
        this.message.success("Record Updated Successfully")
      }, error => {
        this.message.error("Somethins went wrong!!!")
      })
    }
  }

  ngOnInit(): void {
    this.id = toNumber(this.route.snapshot.params.id);
    if (this.id) {
      this.isEdit = true;
      this.getCompanyId()
    }
    this.companyFormGroup = this.fb.group({
      company_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      address:  [null,[Validators.required]],
      phone_number: [null, [Validators.required]],
      status: [null, Validators.required]
    });
  }

  getCompanyId(){
    this.id = toNumber(this.route.snapshot.params.id);
    return this.companyservice.getCompanyById(this.id)
    .subscribe((comp:any) => {
      this.companyFormGroup.setValue({
        company_name: comp.company_name,
        email: comp.email,
        longitude: comp.longitude,
        latitude: comp.latitude,
        address: comp.address,
        phone_number: comp.phone_number,
        status: comp.status
      })
    })
  }
  

}
