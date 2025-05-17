using Microsoft.EntityFrameworkCore;
using lumen_backend.Models;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;


namespace lumen_backend.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Film> Filme { get; set; }
        public DbSet<Datum> Vorstellungen { get; set; }
        public DbSet<Reservation> Reservationen { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}
