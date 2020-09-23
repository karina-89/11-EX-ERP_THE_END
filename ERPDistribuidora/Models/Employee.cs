using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ERPDistribuidora.Models
{
    public class Employee
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

        [JsonConverter(typeof(DecimalToStringConverter))]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Salary { get; set; }


        #region UserSetup

        [StringLength(50)]
        public string UserName { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        [StringLength(50)]
        public string Role { get; set; }

        #endregion

        public ICollection<Order> Orders { get; set; }
    }
}
