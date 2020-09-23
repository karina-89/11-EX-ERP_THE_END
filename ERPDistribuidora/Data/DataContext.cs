using ERPDistribuidora.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPDistribuidora.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<ItemsCategory> ItemsCategories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderLine>().HasKey(l => new { l.OrderId, l.Id });

            modelBuilder.Entity<Employee>().HasData(new Employee[]
            {
                new Employee { Id = 1, Name = "Justo Lozano", UserName = "jlozano", Password = "12345", Role = Role.User, Salary = 24000 },
                new Employee { Id = 2, Name = "Jaime Diez", UserName = "jdiez", Password = "12345", Role = Role.User, Salary = 24000 },
                new Employee { Id = 3, Name = "Socorro Cerdan", UserName = "scerdan", Password = "12345", Role = Role.Admin, Salary = 32000 }
            });
            modelBuilder.Entity<Customer>().HasData(new Customer[]
            {
                new Customer { Id = 1, Name = "Mercadona", Address = "Calle Valencia, 5", City = "Tavernes Blanques", PostalCode = "46016", County = "Valencia" },
                new Customer { Id = 2, Name = "Carrefour", Address = "Calle Campezo, 16, Pol. de las Mercedes", City = "Madrid", PostalCode = "28022", County = "Madrid" },
                new Customer { Id = 3, Name = "Lidl", Address = "Pol. Ind. La Granja, Carrer Beat Oriol, s/n", City = "Montcada i Reixac", PostalCode = "08110", County = "Barcelona" }
            });
            modelBuilder.Entity<ItemsCategory>().HasData(new ItemsCategory[]
            {
                new ItemsCategory { Id = 1, Name = "Tazas" },
                new ItemsCategory { Id = 2, Name = "Cubiertos" },
                new ItemsCategory { Id = 3, Name = "Vasos" },
                new ItemsCategory { Id = 4, Name = "Platos" }
            });
            modelBuilder.Entity<Item>().HasData(new Item[]
            {
                new Item { Id = 1, Name = "Taza perro pirata", Price = 10, ItemsCategoryId = 1 },
                new Item { Id = 2, Name = "Taza unicornio", Price = 10, ItemsCategoryId = 1},
                new Item { Id = 3, Name = "Cuchara", Price = 0.5m, ItemsCategoryId = 2 },
                new Item { Id = 4, Name = "Cuchillo", Price = 0.5m, ItemsCategoryId = 2 },
                new Item { Id = 5, Name = "Vaso minions", Price = 2, ItemsCategoryId = 3 },
                new Item { Id = 6, Name = "Vaso frozen", Price = 2, ItemsCategoryId = 3 },
                new Item { Id = 7, Name = "Plato hondo", Price = 2.5m, ItemsCategoryId = 4 },
                new Item { Id = 8, Name = "Plato llano", Price = 2.5m, ItemsCategoryId = 4 }
            });
            modelBuilder.Entity<Order>().HasData(new Order[]
            {
                new Order { Id = 1, CustomerId = 1, CreationDate = DateTime.Now, EmployeeId = 1, AssignDate = DateTime.Now, OrderStatus = OrderStatus.Pending },
                new Order { Id = 2, CustomerId = 2, CreationDate = DateTime.Now, EmployeeId = 1, AssignDate = DateTime.Now, OrderStatus = OrderStatus.Pending },
                new Order { Id = 3, CustomerId = 1, CreationDate = DateTime.Now, EmployeeId = 2, AssignDate = DateTime.Now, OrderStatus = OrderStatus.Pending },
                new Order { Id = 4, CustomerId = 3, CreationDate = DateTime.Now, EmployeeId = 1, AssignDate = DateTime.Now, OrderStatus = OrderStatus.Pending }
            });
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine[]
            {
                new OrderLine { OrderId = 1, Id = 1, ItemId = 1, Description = "Taza perro pirata", Quantity = 3, Price = 10, Amount = 30 },
                new OrderLine { OrderId = 1, Id = 2, ItemId = 3, Description = "Cuchara", Quantity = 5, Price = 0.5m, Amount = 2.5m },
                new OrderLine { OrderId = 1, Id = 3, ItemId = 2, Description = "Taza unicornio", Quantity = 2, Price = 10, Amount = 20 },
                new OrderLine { OrderId = 2, Id = 1, ItemId = 4, Description = "Cuchillo", Quantity = 10, Price = 0.5m, Amount = 5 },
                new OrderLine { OrderId = 3, Id = 1, ItemId = 5, Description = "Vaso minions", Quantity = 5, Price = 2, Amount = 10 },
                new OrderLine { OrderId = 3, Id = 2, ItemId = 8, Description = "Plato llano", Quantity = 5, Price = 2.5m, Amount = 12.5m },
                new OrderLine { OrderId = 3, Id = 3, ItemId = 7, Description = "Plato hondo", Quantity = 10, Price = 2.5m, Amount = 25 },
                new OrderLine { OrderId = 4, Id = 1, ItemId = 4, Description = "Cuchillo", Quantity = 15, Price = 0.5m, Amount = 7.5m },
                new OrderLine { OrderId = 4, Id = 2, ItemId = 6, Description = "Vaso frozen", Quantity = 20, Price = 2, Amount = 40 }
            });
        }
    }
}
