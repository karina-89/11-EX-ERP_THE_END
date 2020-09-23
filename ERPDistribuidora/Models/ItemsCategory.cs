using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ERPDistribuidora.Models
{
    public class ItemsCategory
    {
        [JsonConverter(typeof(IntToStringConverter))]
        public int Id { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        // Propiedades navegacionales
        public ICollection<Item> Items { get; set; }
    }
}
