using System;
using System.Linq;

namespace normalizrTestProject.DbModels.Dto
{
    public class ContactDto
    {
        public Guid Id { get; set; }

        public string Phonenumber { get; set; }

        public string Email { get; set; }
    }
}