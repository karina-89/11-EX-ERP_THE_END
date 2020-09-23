using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ERPDistribuidora.Models
{
    public class Item
    {
        [JsonConverter(typeof(IntToStringConverter))]
        public int Id { get; set; }
        
        [StringLength(250)]
        [Required]
        public string Name { get; set; }

        [JsonConverter(typeof(DecimalToStringConverter))]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; } = 0;

        [JsonConverter(typeof(IntToStringConverter))]
        public int ItemsCategoryId { get; set; }

        // Propiedades navegacionales
        public ItemsCategory ItemsCategory { get; set; }
    }
}
