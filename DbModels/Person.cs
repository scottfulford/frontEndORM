using System;
using System.Collections.Generic;

#nullable disable

namespace normalizrTestProject.DbModels
{
    public partial class Person
    {
        public Person()
        {
            Addresses = new HashSet<Address>();
            Dogs = new HashSet<Dog>();
        }

        public Guid Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Dog> Dogs { get; set; }
    }
}
