using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Data;
using SupremeBot.Models;

namespace SupremeBot.Controllers
{
    public class AddressesController : Controller
    {
        private readonly DataContext _context;

        public AddressesController(DataContext context)
        {
            _context = context;
        }

        [Route("Addresses/Addresses")]
        [HttpGet]
        public List<Address> Addresses()
        {
            return _context.Addresses.ToList();
        }

        [Route("Addresses/Index")]
        [HttpGet]
        public IActionResult Index()
        {
            var cards = _context.Addresses.ToList();

            return View(cards);
        }

        public async Task<ActionResult> Create()
        {
            return View();
        }

        public async Task<ActionResult> CreateAddress(Address address)
        {
            var model = new Address() { };

            _context.Addresses.Add(address);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Delete(int? id)
        {
            _context.Addresses.Remove(new Address() { Id = id.Value });
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Edit(int id)
        {
            var address = _context.Addresses.FirstOrDefault(x => x.Id == id);
            if (address != null)
                return View(address);
            else
                return NotFound();
        }

        public async Task<ActionResult> EditAddress(Address address)
        {
            _context.Addresses.Update(address);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

    }
}