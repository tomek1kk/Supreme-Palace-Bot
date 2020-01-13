using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Models;

namespace SupremeBot.Controllers
{
    public class TimerController : Controller
    {
        public IActionResult Index(Time time)
        {
            time = new Time
            {
                Hour = 11,
                Minute = 59,
                Second = 50
            };
            return View(time);
        }
    }
}