using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SupremeBot.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string Number { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public CardTypes Type { get; set; }
        public string CVV { get; set; }
    }
}