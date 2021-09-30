import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toNumber } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CompanyService } from './company.service';
import { MapsAPILoader } from '@agm/core';

declare var google:any;
// import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public address: any;
  public searchControl:any;
  public zoom: number;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;


  
  public companyFormGroup: FormGroup = new FormGroup({});
  public id:any;
  public isEdit=false;
  public Status = ['Active', 'inActive']


  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private message:NzMessageService,
    private companyservice: CompanyService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    
  ) { }
  saveForm(): any {
    if (this.isEdit === false) {
      this.companyservice.createCompany(this.companyFormGroup.value)
      .subscribe(
        result => {
          this.message.success("Company Record Added Successfully")
          this.router.navigate([`/app/company-list`]);
        },
        error => {
          if (error.status === 409) {
            this.message.error("Email Already Registered!!")
          } else {
          this.message.error("Something went wrong!!!")
          }
        }
      )
    } else {
      this.companyservice.updateCompany(this.id, this.companyFormGroup.value)
      .subscribe(result => {
        this.message.success("Record Updated Successfully")
        this.router.navigate([`/app/company-list`]);
      }, error => {
        if (error.status === 409) {
          this.message.error("Email Already in Use try another!!!")
        } else {
        this.message.error("Somethins went wrong!!!")
        }
      })
    }
  }
  cancel(): any {
    this.router.navigate(['/app']);
  }

  ngOnInit(): void {
    this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    
    //create search FormControl
    this.searchControl
    
    //set current position
    // this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      console.log(autocomplete)
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place)
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.searchControl = place.formatted_address;
          this.zoom = 18;
        });
      });
    });
    this.id = toNumber(this.route.snapshot.params.id);
    if (this.id) {
      this.isEdit = true;
      this.getCompanyId()
    }
    this.companyFormGroup = this.fb.group({
      company_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      longitude: [],
      latitude: [],
      address:  [null,[Validators.required]],
      phone_number: [null, [Validators.required]],
      status: [true]
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }



  getCompanyId(){
    this.id = toNumber(this.route.snapshot.params.id);
    return this.companyservice.getCompanyById(this.id)
    .subscribe((comp:any) => {
      console.log(" Status",comp.status);
      this.companyFormGroup.setValue({
        company_name: comp.company_name,
        email: comp.email,
        longitude: comp.longitude,
        latitude: comp.latitude,
        address: comp.address,
        phone_number: comp.phone_number,
        status: comp.status === 'true'? true : false
      })
    })
  }
  

}
