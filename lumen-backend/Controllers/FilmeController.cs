using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class FilmeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var filme = new[]
        {
            new { titel = "Dune: Part Two", dauer = 166 },
            new { titel = "Poor Things", dauer = 141 }
        };
        return Ok(filme);
    }
}
