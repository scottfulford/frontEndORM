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

}
import { DTOBaseClass } from "./DTOBaseClass";
 $Classes(*Dto)[ 

//types enum
export enum $Name_ParentChildAssociationProperties {
    $Properties($IsPropertyDTOObject)[
    $Parent_$Name_property = "$Name",
]
}
 
export class $Name$TypeParameters extends DTOBaseClass{ 

$Properties($IsPropertyDTOObject)[
public static AddChildProperty_$Parent_$Name : string= "$name";
]

$Properties[
$name: $Type;  
]
}]

