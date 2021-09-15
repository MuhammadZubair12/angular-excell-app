import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public companyFormGroup: FormGroup = new FormGroup({});


  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private message:NzMessageService
  ) { }
  saveForm(): any {
    
  }

  ngOnInit(): void {
    this.companyFormGroup = this.fb.group({
      companyName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      address:  [null,[Validators.required]],
      phone: [null, [Validators.required]],
      status: [null, Validators.required]
    });
  }

}
