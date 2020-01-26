using Microsoft.EntityFrameworkCore.Migrations;

namespace SupremeBot.Migrations
{
    public partial class taskids : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_TaskItems_TaskItemId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Addresses_AddressId",
                table: "TaskItems");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Cards_CardId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_AddressId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_CardId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_Items_TaskItemId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "TaskItemId",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "TaskItems",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AddressId",
                table: "TaskItems",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "TaskItems",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "AddressId",
                table: "TaskItems",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "TaskItemId",
                table: "Items",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_AddressId",
                table: "TaskItems",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_CardId",
                table: "TaskItems",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_TaskItemId",
                table: "Items",
                column: "TaskItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_TaskItems_TaskItemId",
                table: "Items",
                column: "TaskItemId",
                principalTable: "TaskItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Addresses_AddressId",
                table: "TaskItems",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Cards_CardId",
                table: "TaskItems",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
