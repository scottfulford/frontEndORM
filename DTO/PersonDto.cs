using System;
using System.Collections.Generic;
using System.Linq;

namespace normalizrTestProject.DbModels.Dto
{
    public class PersonDto
    {
        public Guid Id { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public List<AddressDto> Addresses { get; set; }

        public List<DogDto> Dogs { get; set; }
    }
}