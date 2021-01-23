using System;
using System.Collections.Generic;

#nullable disable

namespace normalizrTestProject.DbModels
{
    public partial class Dog
    {
        public Dog()
        {
            Addresses = new HashSet<Address>();
        }

        public Guid Id { get; set; }
        public string Dogname { get; set; }
        public Guid? Ownerpersonid { get; set; }

        public virtual Person Ownerperson { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
    }
}
