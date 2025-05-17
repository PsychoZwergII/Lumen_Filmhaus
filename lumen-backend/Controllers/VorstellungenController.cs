using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lumen_backend.Data;
using lumen_backend.Models;

namespace lumen_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VorstellungenController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VorstellungenController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Liefert alle Vorstellungen für einen Film.
        /// </summary>
        [HttpGet("{filmId:int}")]
        
        public async Task<ActionResult<IEnumerable<Datum>>> GetVorstellungen(int filmId)
        {
            var vorstellungen = await _context.Vorstellungen
                                             .AsNoTracking()
                                             .Where(v => v.FilmId == filmId)
                                             .ToListAsync();

            return Ok(vorstellungen);
        }
    }
}
