using System;
using System.Collections.Generic;

#nullable disable

namespace normalizrTestProject.DbModels
{
    public partial class Contact
    {
        public Guid Id { get; set; }
        public string Phonenumber { get; set; }
        public string Email { get; set; }
    }
}
