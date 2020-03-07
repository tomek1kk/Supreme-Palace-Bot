using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SupremeBot.Models.Dto
{
    public class TaskItemDto
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Delay { get; set; }
        public int RefreshInterval { get; set; }
        public bool OnlyWithEmptyBasket { get; set; }
        public bool UseTimer { get; set; }
        public bool FillAdress { get; set; }
        public int CardId { get; set; }
        public int AddressId { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
    }
}
