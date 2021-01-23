
import { DogDto } from "./DogDto";
import { DTOBaseClass } from "./DTOBaseClass";
import { PersonDto } from "./PersonDto";
  

//types enum
export enum AddressDto_ParentChildAssociationProperties {
    
    AddressDto_Dog_property = "Dog",

    AddressDto_Person_property = "Person",

}
 
export class AddressDto extends DTOBaseClass{ 


public static AddChildProperty_AddressDto_Dog : string= "dog";

public static AddChildProperty_AddressDto_Person : string= "person";



id: string;  

addrline1: string;  

addrline2: string;  

personid: string;  

dogid: string;  

dog: DogDto;  

person: PersonDto;  

}

