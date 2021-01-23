using System;
using System.Collections.Generic;

#nullable disable

namespace normalizrTestProject.DbModels
{
    public partial class Address
    {
        public Guid Id { get; set; }
        public string Addrline1 { get; set; }
        public string Addrline2 { get; set; }
        public Guid? Personid { get; set; }
        public Guid? Dogid { get; set; }

        public virtual Dog Dog { get; set; }
        public virtual Person Person { get; set; }
    }
}
