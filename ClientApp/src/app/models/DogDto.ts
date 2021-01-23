
import { AddressDto } from "./AddressDto";
import { DTOBaseClass } from "./DTOBaseClass";
import { PersonDto } from "./PersonDto";
  

//types enum
export enum DogDto_ParentChildAssociationProperties {
    
    DogDto_Ownerperson_property = "Ownerperson",

    DogDto_Addresses_property = "Addresses",

}
 
export class DogDto extends DTOBaseClass{ 


public static AddChildProperty_DogDto_Ownerperson : string= "ownerperson";

public static AddChildProperty_DogDto_Addresses : string= "addresses";



id: string;  

dogname: string;  

ownerpersonid: string;  

ownerperson: PersonDto;  

addresses: AddressDto[];  

}

