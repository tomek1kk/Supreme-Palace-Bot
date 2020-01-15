using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class seed_sites2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Sites VALUES('palace', 'https://palaceskateboards.com/shop')");
            migrationBuilder.Sql("INSERT INTO Sites VALUES('helas', 'https://helascaps.com/')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
