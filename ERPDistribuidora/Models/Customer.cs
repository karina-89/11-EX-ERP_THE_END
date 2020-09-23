using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ERPDistribuidora.Models
{
    public class Customer
    {
        [JsonConverter(typeof(IntToStringConverter))]
        public int Id { get; set; }

        [StringLength(250)]
        [Required]
        public string Name { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        [StringLength(250)]
        public string City { get; set; }

        [StringLength(20)]
        public string PostalCode { get; set; }

        [StringLength(250)]
        public string County { get; set; }


        // Propiedades navegacionales
        public ICollection<Order> Orders { get; set; }

    }
}
