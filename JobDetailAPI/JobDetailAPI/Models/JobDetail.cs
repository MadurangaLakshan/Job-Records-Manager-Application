using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobDetailAPI.Models
{
    public class JobDetail
    {
        [Key]
        public int JobDetailID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; } = "";

        [Column(TypeName = "nvarchar(200)")]
        public string Description { get; set; } = "";

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Salary { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Location { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Company { get; set; } = "";

    }
}
