import { Injectable, Type } from '@angular/core';
import { denormalize, normalize, NormalizedSchema, schema } from 'normalizr';
//import {DogDto, AddressDto, ContactDto,PersonDto }  from '../models'
import { Guid } from "guid-typescript";
import { produce } from "immer"
import { AttachToParentInfo } from '../models/DTOBaseClass';
import { AddressDto } from '../models/AddressDto';
import { PersonDto } from '../models/PersonDto';
import { ContactDto } from '../models/ContactDto';
import { DogDto } from '../models/DogDto';
import { BehaviorSubject, Observable } from 'rxjs';
//schemas
const addressSchema = new schema.Entity('addresses');
const contactSchema = new schema.Entity('contacts');
const personSchema = new schema.Entity('persons', {
  addresses: [addressSchema]
});
const dogSchema = new schema.Entity('dogs', {
  ownerperson: personSchema,
  addresses: [addressSchema]
});
//types store collection enum
export enum ParentType {
  addresses = "addresses",
  contacts = "contacts",
  persons = "persons",
  dogs = "dogs"
}
//types enum
export enum ParentChildAssociationPropertyName {
  address_Dog_property = "Dog",
  address_Person_property = "Person",
  dog_Person_property = "Ownerperson",
  dog_Addresses_property = "addresses",
  persons = "persons",
  dogs = "dogs"
}
//associate 'add' objects to their parents

const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

@Injectable({
  providedIn: 'root'
})
export class DogServiceService {

  public stateAsObjectTree$: Observable<DogDto>;
  private _stateAsObjectTree$: BehaviorSubject<DogDto>;

  //public stateAsNormalizedObjects$: Observable<any>;
  //private _stateAsNormalizedObjects$: BehaviorSubject<any>;


  public getObjectByIdFromNormalizedStore(storetype: ParentType, id: string) {
    var ret = null;
    switch (storetype) {
      
      case ParentType.addresses:
        ret = this.normalizedDogAggregate.entities.addresses[id];
        break;
      default:
        break;
        
    }
    return ret;
  }
  

  private setState(nextState: DogDto): void {
    deepFreeze(nextState);
    this._stateAsObjectTree$.next(nextState);
  }

  constructor() {
    let address = new AddressDto();
    address.id = Guid.create().toString();
    address.addrline1 = "addrLn1";
    address.addrline2 = "addrLn2";

    let person = new PersonDto();
    person.id = Guid.create().toString();
    person.addresses = new Array<AddressDto>();
    person.addresses.push(address);
    person.firstname = "Jon"
    person.lastname = "Snow"

    let dog = new DogDto();
    dog.id = Guid.create().toString();
    dog.dogname = "fido";
    dog.addresses = new Array<AddressDto>();
    dog.addresses.push(address);
    dog.ownerperson = person;

    this.dog = dog;
    this.normalizedDogAggregate = this.getNormalizedData();
    this._stateAsObjectTree$ = new BehaviorSubject(this.dog);
    this.stateAsObjectTree$ = this._stateAsObjectTree$.asObservable();
    //freeze it
    this.setState(this.dog);
  }

  private dog: DogDto;
  private _normalizedDogAggregate: any;
  private get normalizedDogAggregate(){
    deepFreeze(this._normalizedDogAggregate);
    return this._normalizedDogAggregate;
  };
  private set normalizedDogAggregate(normalizedAggregate) {
    this._normalizedDogAggregate = normalizedAggregate;
  }
  //getData(): DogDto {

  //  return this.dog;
  //}

  

  getNormalizedData() {
    let testdog = this.dog;
    let normalizedData = normalize(testdog, dogSchema);
    return normalizedData;
  }
  getNormalizedVersionOfObject(objectToUpdate: DogDto | AddressDto | PersonDto | ContactDto) {
    var normalizedData = null;
    if (objectToUpdate instanceof DogDto) {
      normalizedData = normalize(objectToUpdate, dogSchema);
    } else if (objectToUpdate instanceof AddressDto) {
      normalizedData = normalize(objectToUpdate, addressSchema);
    } else if (objectToUpdate instanceof PersonDto) {
      normalizedData = normalize(objectToUpdate, personSchema);
    } else if (objectToUpdate instanceof ContactDto) {
      normalizedData = normalize(objectToUpdate, contactSchema);
    }
    return normalizedData;
  }
  updateObject(objectToUpdate: DogDto | AddressDto | PersonDto | ContactDto) {
    
    var normalizedData = null;
    normalizedData = this.getNormalizedVersionOfObject(objectToUpdate);
    if (normalizedData != null) {
      var storeType = null; 
      if (objectToUpdate instanceof DogDto) {
        storeType = ParentType.dogs;
      } else if (objectToUpdate instanceof AddressDto) {
        storeType = ParentType.addresses;
      } else if (objectToUpdate instanceof PersonDto) {
        storeType = ParentType.persons;
      } else if (objectToUpdate instanceof ContactDto) {
        storeType = ParentType.contacts;
      }
      this.mergeUpdatedDataIntoStoreAndRefreshObservable(normalizedData, storeType)
    }    
  }
  private mergeUpdatedDataIntoStoreAndRefreshObservable(normalizedData: any, storeType: ParentType) {
    //merge entities
    if (storeType == ParentType.dogs) {
      var dogs = Object.assign(this.normalizedDogAggregate.entities.dogs, normalizedData.entities.dogs)
    } else if (storeType == ParentType.addresses) {
      var addresses = Object.assign({},this.normalizedDogAggregate.entities.addresses, normalizedData.entities.addresses);
      //this.normalizedDogAggregate.entities.addresses = addresses;
      var normalized = produce((draft, Address) => {
        draft.entities.addresses = Address;
      })(this.normalizedDogAggregate, addresses);
      this.normalizedDogAggregate= normalized;
    } else if (storeType == ParentType.persons) {
      var persons = Object.assign(this.normalizedDogAggregate.entities.persons, normalizedData.entities.persons);
    } else if (storeType == ParentType.contacts) {
      var contacts = Object.assign(this.normalizedDogAggregate.entities.addresses, normalizedData.entities.addresses);//forgot to add contacts to schema - whatever for demo

    }
    var dog = denormalize(this._stateAsObjectTree$.value.id, dogSchema, this.normalizedDogAggregate.entities)
    this.setState(dog);
  }
  //addAddressToDogCallback = produce((draft, Address) => {
  //  //get dog from normalized store

  //  //addAddress to correct property or array on dog
  //  //

  //});

  addNewChildObject(detachedChild: DogDto | AddressDto | PersonDto | ContactDto, parentToAddToType: ParentType, parentId: string, parentPropertyName: string) {
    var normalizedData = null;
    let attachToParentInfo = new AttachToParentInfo();
    attachToParentInfo.parentId = parentId;
    attachToParentInfo.parentStoreCollectionName = parentToAddToType.valueOf();
    attachToParentInfo.ParentPropertyName = parentPropertyName.valueOf();

    detachedChild.attachToParentInfo = attachToParentInfo;
    this.updateObject(detachedChild);

    ////normalize
    //var NormalizedDetachedobj = this.getNormalizedVersionOfObject(detachedChild);
    //if (normalizedData != null) {
    //  mergeUpdatedDataIntoStoreAndRefreshObservable
    //}

  }
  //if 'add' is clicked on new child
  attachObject(detachedChild: DogDto | AddressDto | PersonDto | ContactDto) {
    var parent = null;    


    var normalized = produce((draft) => {
      //get parent from normalized store
      parent = draft.entities[detachedChild.attachToParentInfo.parentStoreCollectionName][detachedChild.attachToParentInfo.parentId]
      //  add child id to array or property
      var arrayOrprimitiveIdPropertyOnParent = parent[detachedChild.attachToParentInfo.ParentPropertyName];
      if (Array.isArray(arrayOrprimitiveIdPropertyOnParent)) {
        (arrayOrprimitiveIdPropertyOnParent as Array<any>).push(detachedChild.id);
      } else {
        arrayOrprimitiveIdPropertyOnParent = detachedChild.id;
      }


    })(this.normalizedDogAggregate);
    this.normalizedDogAggregate = normalized;

    

    var dog = denormalize(this._stateAsObjectTree$.value.id, dogSchema, this.normalizedDogAggregate.entities)
    this.setState(dog);
    ////add detachedChild.id to correct property or array on dog
    ////normalize and update

    ////normalize
    //var NormalizedDetachedobj = this.getNormalizedVersionOfObject(detachedChild);
    //if (normalizedData != null) {
    //  //merge
    //}

  }

}
