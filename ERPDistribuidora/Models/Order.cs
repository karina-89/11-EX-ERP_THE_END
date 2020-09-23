using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace ERPDistribuidora.Models
{
    public class Order
    {
        [JsonConverter(typeof(IntToStringConverter))]
        public int Id { get; set; }

        // Cliente
        [JsonConverter(typeof(IntToStringConverter))]
        public int CustomerId { get; set; }

        // Empleado
        [JsonConverter(typeof(IntToStringConverter))]
        public int? EmployeeId { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.Now;
        public DateTime? ShipDate { get; set; }
        public DateTime? AssignDate { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public OrderStatus OrderStatus { get; set; }

        // Propiedades navegacionales
        public Customer Customer { get; set; }
        public Employee Employee { get; set; }
        public ICollection<OrderLine> OrderLines { get; set; }
    }

    public enum OrderStatus
    {
        [EnumMember(Value = "Pendiente de tratar")]
        Pending,
        [EnumMember(Value = "En proceso")]
        InProcess,
        [EnumMember(Value = "En reparto")]
        InDelivery,
        [EnumMember(Value = "Entregado")]
        Delivered,
        [EnumMember(Value = "Cancelado")]
        Canceled
    }
}
