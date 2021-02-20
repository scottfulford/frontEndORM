
import { DTOBaseClass } from "./DTOBaseClass";
  
    
import {PersonDto} from "./PersonDto";

import {AddressDto} from "./AddressDto";



 
export class DogDto extends DTOBaseClass{ 


public static AddChildProperty_DogDto_Ownerperson : string= "ownerperson";

public static AddChildProperty_DogDto_Addresses : string= "addresses";



id: string;  

dogname: string;  

ownerpersonid: string;  

ownerperson: PersonDto;  

addresses: AddressDto[];  

}

