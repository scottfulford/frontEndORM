import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogServiceService, ParentChildAssociationPropertyName, ParentType } from '../services/dog-service.service';
import { Observable } from 'rxjs';
import { DogDto, DogDto_ParentChildAssociationProperties } from '../models/DogDto';
import { AddressDto } from '../models/AddressDto';
import {  AttachToParentInfo } from '../models/DTOBaseClass';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public DogDto$: Observable<DogDto>;
  public testreference: DogDto;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public dogService: DogServiceService) {
    //let DogDto$ = dogService.stateAsObjectTree$;
    
    

    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  public getNewDetachedAddress() {
    if (this.newAddressID!="") {
      return this.dogService.getObjectByIdFromNormalizedStore(ParentType.addresses, this.newAddressID)
    } else {
      return null
    }
    
  }
  private newAddressID = "";
  //this would normally go on the parent component
  public addNewDetachedAddress(dog: DogDto) {
    let random3Digits = Math.floor(Math.random() * Math.floor(999));
    let newAddress = new AddressDto();
    newAddress.id = random3Digits + "d0982-00b3-4abf-e3f9-51c390820f99";//normally this would be dynamically created and then routed to. 
    this.newAddressID = newAddress.id;
    newAddress.addrline1 = "new Dog Address";
    newAddress.addrline2 = "123 dog street";
    
    //add a detached child to the store object tree
    this.dogService.addNewChildObject(newAddress, ParentType.dogs, dog.id, DogDto.AddChildProperty_DogDto_Addresses);

    //or
    //didn't work
    //let attachCallback: AddToParentCallBack<DogDto> = (_dog, _newAddress) => { _dog.addresses.push(_newAddress) } 
    //newAddress.attachToParentCallback(dog, attachCallback);

    //then normally navigate there

  }

  public ConfirmNewDetachedAddress() {
    var address = this.dogService.getObjectByIdFromNormalizedStore(ParentType.addresses, this.newAddressID);//normally this id would be in the url -routed to from the above 'add' method, 
    this.dogService.attachObject(address);
    this.newAddressID = null;

    //or
    //SF> didn't work...
    //var address: AddressDto = this.dogService.getObjectByIdFromNormalizedStore(ParentType.addresses, this.newAddressID);//normally this id would be in the url -routed to from the above 'add' method, 
    //address.attachToParent();
    //this.newAddressID = null;
  }

  public updateAddress(address: AddressDto) {
    let updatedAddress = new AddressDto();
    updatedAddress.id = address.id;

    updatedAddress.addrline1 = address.addrline1+"abc xyz";
    updatedAddress.addrline2 = address.addrline2;
    this.dogService.updateObject(updatedAddress);
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
