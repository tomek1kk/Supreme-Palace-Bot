using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Data;
using SupremeBot.Models;

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

        [Route("Tasks/Create1")]
        [HttpGet]
        public IActionResult Create1()
        {
            return View("Create1");
        }

        public IActionResult CreateTaskItem1(TaskItem task)
        {
            _context.TaskItems.Add(task);
            _context.SaveChanges();

            //return RedirectToAction("Create2");
            return RedirectToAction("Index");
        }

        [Route("Tasks/Colors")]
        [HttpGet]
        public IEnumerable<Color> Colors()
        {
            return _context.Colors.ToList();
        }
    }
}