${
    using Typewriter.Extensions.Types;
    Template(Settings settings)
    {
        settings.IncludeProject("normalizrTestProject");
        settings.OutputFilenameFactory = file => 
        {
            return "../ClientApp/src/app/models/"+file.Name.Replace(".cs", ".ts");
        };
    }

    bool IsPropertyDTOObject(Property p)
    {
        //return p.Type;
        // exclude attributes
        if(p.Type.ToString().EndsWith("Dto") || p.Type.ToString().EndsWith("Dto[]")) return true;
        return false;
        
    }
    
    string getTypeWithoutBracketsIfArray(Property p)
    {
        var typestr = p.Type.ToString();
        if(typestr.EndsWith("[]")){
            typestr = typestr.Replace("[]","");
        }
        return typestr;
    }
}
import { DTOBaseClass } from "./DTOBaseClass";
 $Classes(*Dto)[ 
    $Properties($IsPropertyDTOObject)[
import {$getTypeWithoutBracketsIfArray} from "./$getTypeWithoutBracketsIfArray";
]


 
export class $Name$TypeParameters extends DTOBaseClass{ 

$Properties($IsPropertyDTOObject)[
public static AddChildProperty_$Parent_$Name : string= "$name";
]

$Properties[
$name: $Type;  
]
}]

