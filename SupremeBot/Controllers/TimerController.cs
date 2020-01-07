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
                Hour = 20,
                Minute = 42,
                Second = 20
            };
            return View(time);
        }
    }
}