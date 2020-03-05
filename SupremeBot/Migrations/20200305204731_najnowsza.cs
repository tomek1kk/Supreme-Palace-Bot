using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class najnowsza : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colors_Items_ItemId",
                table: "Colors");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemNames_Items_ItemId",
                table: "ItemNames");

            migrationBuilder.DropIndex(
                name: "IX_ItemNames_ItemId",
                table: "ItemNames");

            migrationBuilder.DropIndex(
                name: "IX_Colors_ItemId",
                table: "Colors");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "ItemNames");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Colors");

            migrationBuilder.AddColumn<string>(
                name: "Colors",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Names",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colors",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Names",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "ItemNames",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Colors",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemNames_ItemId",
                table: "ItemNames",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Colors_ItemId",
                table: "Colors",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Colors_Items_ItemId",
                table: "Colors",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemNames_Items_ItemId",
                table: "ItemNames",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
