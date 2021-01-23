using System;
using System.Linq;

namespace normalizrTestProject.DbModels.Dto
{
    public class AddressDto
    {
        public Guid Id { get; set; }

        public string Addrline1 { get; set; }

        public string Addrline2 { get; set; }

        public Guid? Personid { get; set; }

        public Guid? Dogid { get; set; }

        public DogDto Dog { get; set; }

        public PersonDto Person { get; set; }
    }
}