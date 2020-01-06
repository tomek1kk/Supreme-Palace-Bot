using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Data;

namespace SupremeBot.Controllers
{
    public class TasksController : Controller
    {
        private readonly DataContext _context;

        public TasksController(DataContext context)
        {
            _context = context;
        }

        [Route("Tasks/Index")]
        [HttpGet]
        public IActionResult Index()
        {
            var items = _context.TaskItems.ToList();
            return View(items);
        }
    }
}