using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SupremeBot.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }
        public int Delay { get; set; }
        public int RefreshInterval { get; set; }
        public bool OnlyWithEmptyBasket { get; set; }
        public bool UseTimer { get; set; }
        public bool AnyColor { get; set; }
        public bool FillAdress { get; set; }
        public List<Item> Items { get; set; }
        public Card Card { get; set; }
        public Address Address { get; set; }
        public Timer Timer { get; set; }
    }
}
