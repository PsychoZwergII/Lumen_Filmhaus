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
    // Pflichtfelder prüfen
    if (string.IsNullOrWhiteSpace(reservation.Name) ||
        string.IsNullOrWhiteSpace(reservation.Email) ||
        string.IsNullOrWhiteSpace(reservation.Sitzplaetze))
    {
        return BadRequest("Name, Email und Sitzplätze müssen angegeben werden.");
    }

    // 1) Nur die Sitzplatz-Strings für diese Vorstellung auslesen
    var rawLists = await _context.Reservationen
        .Where(r => r.VorstellungId == reservation.VorstellungId)
        .Select(r => r.Sitzplaetze)
        .ToListAsync();

    // 2) Erst jetzt in-memory splitten und trimmen
    var alreadyBooked = rawLists
        .SelectMany(s => s.Split(',', StringSplitOptions.RemoveEmptyEntries))
        .Select(s => s.Trim())
        .ToHashSet(StringComparer.OrdinalIgnoreCase);

    // 3) Die neu angefragten Plätze
    var neu = reservation.Sitzplaetze
        .Split(',', StringSplitOptions.RemoveEmptyEntries)
        .Select(s => s.Trim());

    // 4) Überschneidung prüfen
    if (neu.Any(p => alreadyBooked.Contains(p)))
        return Conflict("Ein oder mehrere der ausgewählten Plätze sind bereits reserviert.");

    // 5) Speichern
    _context.Reservationen.Add(reservation);
    await _context.SaveChangesAsync();

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
            // 1) Nur die Sitzplatz-Strings auslesen
            var raw = await _context.Reservationen
                .Where(r => r.VorstellungId == vorstellungId)
                .Select(r => r.Sitzplaetze)
                .ToListAsync();

            // 2) In-Memory splitten
            var sitzlisten = raw
                .SelectMany(s => s
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(p => p.Trim()))
                .ToList();

            return Ok(sitzlisten);
        }

        /// <summary>
        /// Alle Reservationen für
    }
}
