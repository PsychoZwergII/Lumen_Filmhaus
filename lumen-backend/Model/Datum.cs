using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lumen_backend.Models
{
    public class Datum
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime DatumUhrzeit { get; set; }

        [Required]
        public int FilmId { get; set; }

        [ForeignKey("FilmId")]
        public Film? Film { get; set; }
    }
}

