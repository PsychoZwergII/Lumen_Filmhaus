using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lumen_backend.Data;
using lumen_backend.Models;

namespace lumen_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FilmeController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Liefert alle Filme (Id + Name).
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilme()
        {
            var filme = await _context.Filme
                                      .AsNoTracking()
                                      .ToListAsync();
            return Ok(filme);
        }

        /// <summary>
        /// Liefert einen einzelnen Film nach Id.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Film>> GetFilm(int id)
        {
            var film = await _context.Filme
                                     .AsNoTracking()
                                     .FirstOrDefaultAsync(f =>
                                     f.Id == id);
            if (film == null)
                return NotFound();
            return Ok(film);
        }
    }
}
