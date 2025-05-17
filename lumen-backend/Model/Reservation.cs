using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace lumen_backend.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int FilmId { get; set; }

        [ForeignKey("FilmId")]
        public Film? Film { get; set; }

        [Required]
        public int VorstellungId { get; set; }

        [ForeignKey("VorstellungId")]

        [JsonIgnore]
        public Datum? Vorstellung { get; set; }

        [Required]
        [MaxLength(255)]
        public string Sitzplaetze { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
    }
}
