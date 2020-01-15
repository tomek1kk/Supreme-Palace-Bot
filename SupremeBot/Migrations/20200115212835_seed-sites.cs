using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class seedsites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Site VALUES('supreme', 'https://supremenewyork.com/shop/all')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
