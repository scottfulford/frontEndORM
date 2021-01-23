
import { AddressDto } from "./AddressDto";
import { DogDto } from "./DogDto";
import { DTOBaseClass } from "./DTOBaseClass";
  

//types enum
export enum PersonDto_ParentChildAssociationProperties {
    
    PersonDto_Addresses_property = "Addresses",

    PersonDto_Dogs_property = "Dogs",

}
 
export class PersonDto extends DTOBaseClass{ 


public static AddChildProperty_PersonDto_Addresses : string= "addresses";

public static AddChildProperty_PersonDto_Dogs : string= "dogs";



id: string;  

firstname: string;  

lastname: string;  

addresses: AddressDto[];  

dogs: DogDto[];  

}

