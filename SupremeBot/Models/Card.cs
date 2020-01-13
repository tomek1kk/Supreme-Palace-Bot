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
        [Required]
        public string Name { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string Month { get; set; }
        [Required]
        public string Year { get; set; }
        [Required]
        public CardTypes Type { get; set; }
        [Required]
        public string CVV { get; set; }
    }
}