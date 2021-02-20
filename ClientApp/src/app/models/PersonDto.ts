
import { DTOBaseClass } from "./DTOBaseClass";
  
    
import {AddressDto} from "./AddressDto";

import {DogDto} from "./DogDto";



 
export class PersonDto extends DTOBaseClass{ 


public static AddChildProperty_PersonDto_Addresses : string= "addresses";

public static AddChildProperty_PersonDto_Dogs : string= "dogs";



id: string;  

firstname: string;  

lastname: string;  

addresses: AddressDto[];  

dogs: DogDto[];  

}

