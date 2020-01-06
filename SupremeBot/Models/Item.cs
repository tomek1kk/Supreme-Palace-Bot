using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SupremeBot.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public List<ItemName> Names { get; set; }
        public List<Color> Colors { get; set; }
        public Sizes Size { get; set; }
        public Categories Category { get; set; }
        public bool AnyColor { get; set; }
    }
}
