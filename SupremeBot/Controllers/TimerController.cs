using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SupremeBot.Controllers
{
    public class TimerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}