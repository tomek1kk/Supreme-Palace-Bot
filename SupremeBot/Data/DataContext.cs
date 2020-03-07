using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SupremeBot.Models;
using SupremeBot.Models.Dto;

namespace SupremeBot.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<SupremeBot.Models.Dto.TaskItemDto> TaskItemDto { get; set; }

    }
}
