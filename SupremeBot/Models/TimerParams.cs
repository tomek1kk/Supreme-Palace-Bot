using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupremeBot.Models
{
    public class TimerParams
    {
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
        public int Site { get; set; }
        public int TaskId { get; set; }
    }
}
