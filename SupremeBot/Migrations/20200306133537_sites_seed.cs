using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class sites_seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into sites values ('Supreme', 'https://supremenewyork.com/shop/all')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
