using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lumen_backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeToIntKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Filme",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FilmName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filme", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Vorstellungen",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    DatumUhrzeit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FilmId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vorstellungen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vorstellungen_Filme_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Filme",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Reservationen",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FilmId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    VorstellungId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Sitzplaetze = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservationen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservationen_Filme_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Filme",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservationen_Vorstellungen_VorstellungId",
                        column: x => x.VorstellungId,
                        principalTable: "Vorstellungen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Reservationen_FilmId",
                table: "Reservationen",
                column: "FilmId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservationen_VorstellungId",
                table: "Reservationen",
                column: "VorstellungId");

            migrationBuilder.CreateIndex(
                name: "IX_Vorstellungen_FilmId",
                table: "Vorstellungen",
                column: "FilmId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservationen");

            migrationBuilder.DropTable(
                name: "Vorstellungen");

            migrationBuilder.DropTable(
                name: "Filme");
        }
    }
}
