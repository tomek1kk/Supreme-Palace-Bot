using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class sitefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Sites_SiteId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_SiteId",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "SiteId",
                table: "TaskItems");

            migrationBuilder.AddColumn<int>(
                name: "Site",
                table: "TaskItems",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Site",
                table: "TaskItems");

            migrationBuilder.AddColumn<int>(
                name: "SiteId",
                table: "TaskItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_SiteId",
                table: "TaskItems",
                column: "SiteId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Sites_SiteId",
                table: "TaskItems",
                column: "SiteId",
                principalTable: "Sites",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
