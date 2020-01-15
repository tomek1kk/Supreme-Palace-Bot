using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SupremeBot.Models;

namespace SupremeBot.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemName> ItemNames { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Site> Sites { get; set; }

    }
}
