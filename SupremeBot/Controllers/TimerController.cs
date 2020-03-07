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

        public async Task<IActionResult> Index(TimerParams model)
        {
            TasksApiController.SetCurrentId(model.TaskId);

            string url = "https://supremenewyork.com/shop/all";

            @ViewBag.SiteUrl = url;

            return View(model);
        }
    }
}