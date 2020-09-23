using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ERPDistribuidora.Models
{
    public class OrderLine
    {
        [JsonConverter(typeof(IntToStringConverter))]
        public int OrderId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonConverter(typeof(IntToStringConverter))]
        public int Id { get; set; }

        // Producto
        [JsonConverter(typeof(IntToStringConverter))]
        public int ItemId { get; set; }
        [StringLength(250)]
        public string Description { get; set; }

        [JsonConverter(typeof(IntToStringConverter))]
        public int Quantity { get; set; }
        
        [Column(TypeName = "decimal(18, 2)")]
        [JsonConverter(typeof(DecimalToStringConverter))]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [JsonConverter(typeof(DecimalToStringConverter))]
        public decimal Amount { get; set; }

        // Propiedades navegacionales
        public Item Item { get; set; }
        public Order Order { get; set; }
    }
}
