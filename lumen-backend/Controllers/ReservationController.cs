using Microsoft.AspNetCore.Mvc;
using lumen_backend.Data;
using lumen_backend.Models;
using Microsoft.EntityFrameworkCore;       // ← EF-Core Async Extensions

namespace lumen_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Neue Reservation anlegen.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation([FromBody] Reservation reservation)
        {
            // Validierung der Pflichtfelder
            if (string.IsNullOrWhiteSpace(reservation.Name) ||
                string.IsNullOrWhiteSpace(reservation.Email) ||
                string.IsNullOrWhiteSpace(reservation.Sitzplaetze))
            {
                return BadRequest("Name, Email und Sitzplätze müssen angegeben werden.");
            }

            // **Nicht mehr nötig**: reservation.Id = Guid.NewGuid();
            // Stattdessen einfach hinzufügen und speichern:
            _context.Reservationen.Add(reservation);
            await _context.SaveChangesAsync();

            // reservation.Id wurde jetzt von der DB gesetzt (int)
            return CreatedAtAction(
                nameof(GetReservation),
                new { id = reservation.Id },
                reservation);
        }

        /// <summary>
        /// Einzelne Reservation abfragen.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var res = await _context.Reservationen.FindAsync(id);
            if (res == null) return NotFound();
            return Ok(res);
        }

        /// <summary>
        /// Alle reservierten Plätze für eine Vorstellung.
        /// </summary>
        [HttpGet("belegte/{vorstellungId:int}")]
        public async Task<ActionResult<IEnumerable<string>>> GetBelegtePlaetze(int vorstellungId)
        {
            var sitzlisten = await _context.Reservationen
                .Where(r => r.VorstellungId == vorstellungId)
                .SelectMany(r => r.Sitzplaetze.Split(',', StringSplitOptions.RemoveEmptyEntries))
                .ToListAsync();

            return Ok(sitzlisten);
        }
    }
}
