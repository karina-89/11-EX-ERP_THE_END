using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ERPDistribuidora.Migrations
{
    public partial class InitialSetup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    Address = table.Column<string>(maxLength: 250, nullable: true),
                    City = table.Column<string>(maxLength: 250, nullable: true),
                    PostalCode = table.Column<string>(maxLength: 20, nullable: true),
                    County = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    Address = table.Column<string>(maxLength: 250, nullable: true),
                    City = table.Column<string>(maxLength: 250, nullable: true),
                    PostalCode = table.Column<string>(maxLength: 20, nullable: true),
                    County = table.Column<string>(maxLength: 250, nullable: true),
                    Salary = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    UserName = table.Column<string>(maxLength: 50, nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Role = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemsCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<int>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    ShipDate = table.Column<DateTime>(nullable: true),
                    AssignDate = table.Column<DateTime>(nullable: true),
                    OrderStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    ItemsCategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_ItemsCategories_ItemsCategoryId",
                        column: x => x.ItemsCategoryId,
                        principalTable: "ItemsCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderLines",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 250, nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLines", x => new { x.OrderId, x.Id });
                    table.ForeignKey(
                        name: "FK_OrderLines_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderLines_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "City", "County", "Name", "PostalCode" },
                values: new object[,]
                {
                    { 1, "Calle Valencia, 5", "Tavernes Blanques", "Valencia", "Mercadona", "46016" },
                    { 2, "Calle Campezo, 16, Pol. de las Mercedes", "Madrid", "Madrid", "Carrefour", "28022" },
                    { 3, "Pol. Ind. La Granja, Carrer Beat Oriol, s/n", "Montcada i Reixac", "Barcelona", "Lidl", "08110" }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "Address", "City", "County", "Name", "Password", "PostalCode", "Role", "Salary", "UserName" },
                values: new object[,]
                {
                    { 1, null, null, null, "Justo Lozano", "12345", null, "User", 24000m, "jlozano" },
                    { 2, null, null, null, "Jaime Diez", "12345", null, "User", 24000m, "jdiez" },
                    { 3, null, null, null, "Socorro Cerdan", "12345", null, "Admin", 32000m, "scerdan" }
                });

            migrationBuilder.InsertData(
                table: "ItemsCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Tazas" },
                    { 2, "Cubiertos" },
                    { 3, "Vasos" },
                    { 4, "Platos" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemsCategoryId", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 1, "Taza perro pirata", 10m },
                    { 2, 1, "Taza unicornio", 10m },
                    { 3, 2, "Cuchara", 0.5m },
                    { 4, 2, "Cuchillo", 0.5m },
                    { 5, 3, "Vaso minions", 2m },
                    { 6, 3, "Vaso frozen", 2m },
                    { 7, 4, "Plato hondo", 2.5m },
                    { 8, 4, "Plato llano", 2.5m }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "AssignDate", "CreationDate", "CustomerId", "EmployeeId", "OrderStatus", "ShipDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(1474), new DateTime(2020, 9, 23, 21, 45, 27, 955, DateTimeKind.Local).AddTicks(9474), 1, 1, 0, null },
                    { 2, new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(3736), new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(3696), 2, 1, 0, null },
                    { 4, new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(3818), new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(3811), 3, 1, 0, null },
                    { 3, new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(3794), new DateTime(2020, 9, 23, 21, 45, 27, 956, DateTimeKind.Local).AddTicks(3786), 1, 2, 0, null }
                });

            migrationBuilder.InsertData(
                table: "OrderLines",
                columns: new[] { "OrderId", "Id", "Amount", "Description", "ItemId", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, 30m, "Taza perro pirata", 1, 10m, 3 },
                    { 1, 3, 20m, "Taza unicornio", 2, 10m, 2 },
                    { 1, 2, 2.5m, "Cuchara", 3, 0.5m, 5 },
                    { 2, 1, 5m, "Cuchillo", 4, 0.5m, 10 },
                    { 4, 1, 7.5m, "Cuchillo", 4, 0.5m, 15 },
                    { 3, 1, 10m, "Vaso minions", 5, 2m, 5 },
                    { 4, 2, 40m, "Vaso frozen", 6, 2m, 20 },
                    { 3, 3, 25m, "Plato hondo", 7, 2.5m, 10 },
                    { 3, 2, 12.5m, "Plato llano", 8, 2.5m, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemsCategoryId",
                table: "Items",
                column: "ItemsCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderLines_ItemId",
                table: "OrderLines",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_EmployeeId",
                table: "Orders",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderLines");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "ItemsCategories");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
