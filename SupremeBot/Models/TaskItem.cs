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
        public string Name { get; set; }
        public int Delay { get; set; }
        public int RefreshInterval { get; set; }
        public bool OnlyWithEmptyBasket { get; set; }
        public bool UseTimer { get; set; }
        public bool AnyColor { get; set; }
        public bool FillAdress { get; set; }
        public List<Item> Items { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
        //public int Site { get; set; }
    }
}
