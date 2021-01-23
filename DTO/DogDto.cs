using System;
using System.Collections.Generic;
using System.Linq;

namespace normalizrTestProject.DbModels.Dto
{  
    public class DogDto
    {
        public Guid Id { get; set; }

        public string Dogname { get; set; }

        public Guid? Ownerpersonid { get; set; }

        public PersonDto Ownerperson { get; set; }

        public List<AddressDto> Addresses { get; set; }
    }
}