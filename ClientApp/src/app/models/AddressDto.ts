
import { DTOBaseClass } from "./DTOBaseClass";
  
    
import {DogDto} from "./DogDto";

import {PersonDto} from "./PersonDto";



 
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

