using System.ComponentModel.DataAnnotations;

namespace lumen_backend.Models
{
    public class Film
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FilmName { get; set; } = string.Empty;
    }
}
