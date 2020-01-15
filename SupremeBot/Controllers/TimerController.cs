using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Data;
using SupremeBot.Models;

namespace SupremeBot.Controllers
{
    public class TimerController : Controller
    {
        private readonly DataContext _context;
        public TimerController(DataContext context)
        {
            _context = context;
        }

        public IActionResult Index(TimerParams model)
        {
            TasksApiController.SetCurrentId(model.TaskId);
            Site site = _context.Sites.FirstOrDefault(x => x.Id == model.Site);
            string url;
            if (site != null)
                url = site.SiteUrl;
            else
                url = "https://supremenewyork.com/shop/all";

            return View(new TimerViewModel
            {
                Hour = model.Hour,
                Minute = model.Minute,
                Second = model.Second,
                SiteUrl = url
            });
        }
    }
}