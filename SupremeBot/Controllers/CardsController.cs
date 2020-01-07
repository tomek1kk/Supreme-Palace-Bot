using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Data;
using SupremeBot.Models;

namespace SupremeBot.Controllers
{
    public class CardsController : Controller
    {
        private readonly DataContext _context;

        public CardsController(DataContext context)
        {
            _context = context;
        }

        [Route("Cards/Cards")]
        [HttpGet]
        public List<Card> Cards()
        {
            return _context.Cards.ToList();
        }

        [Route("Cards/Index")]
        [HttpGet]
        public IActionResult Index()
        {
            var cards = _context.Cards.ToList();

            return View(cards);
        }

        public async Task<ActionResult> Create()
        {
            return View();
        }

        public async Task<ActionResult> CreateCard(Card card)
        {
            var model = new Card() { };

            _context.Cards.Add(card);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Delete(int? id)
        {
            _context.Cards.Remove(new Card() { Id = id.Value });
            _context.SaveChanges();
            return RedirectToAction("Index");
        }



    }
}