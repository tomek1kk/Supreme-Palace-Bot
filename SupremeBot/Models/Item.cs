using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;

namespace SupremeBot.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        //public List<ItemName> Names { get; set; }
        //public List<Color> Colors { get; set; }
        public string Names { get; set; }
        public string Colors { get; set; }
        public Sizes Size { get; set; }
        public Categories Category { get; set; }
        public bool AnyColor { get; set; }
        //public int TaskId { get; set; }
        //public TaskItem Task { get; set; }
    }
}
