using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupremeBot.Models.Dto
{
    public class ItemDto
    {
        public string Names { get; set; }
        public string Colors { get; set; }
        public Sizes Size { get; set; }
        public Categories Category { get; set; }
        public bool AnyColor { get; set; }
        public int TaskId { get; set; }
    }
}
