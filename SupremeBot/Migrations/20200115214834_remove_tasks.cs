using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class remove_tasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM TaskItems WHERE SiteId = NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
