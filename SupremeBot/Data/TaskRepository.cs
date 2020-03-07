using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SupremeBot.Models;
using SupremeBot.Models.Dto;

namespace SupremeBot.Data
{
    public class TaskRepository : ITaskRepository
    {
        private DataContext _context;

        public TaskRepository(DataContext context)
        {
            _context = context;
        }

        public TaskItem CreateTaskFromDto(TaskItemDto dto)
        {
            TaskItem taskItem = new TaskItem
            {
                Name = dto.Name,
                Delay = dto.Delay,
                RefreshInterval = dto.RefreshInterval,
                OnlyWithEmptyBasket = dto.OnlyWithEmptyBasket,
                UseTimer = dto.UseTimer,
                FillAdress = dto.FillAdress,
                CardId = dto.CardId,
                AddressId = dto.AddressId,
                Hour = dto.Hour,
                Minute = dto.Minute,
                Second = dto.Second
            };

            _context.TaskItems.Add(taskItem);
            _context.SaveChanges();

            return taskItem;
        }

        public TaskItem GetTaskById(int id)
        {
            return _context.TaskItems.FirstOrDefault(t => t.Id == id);
        }

        public IEnumerable<Item> GetItemsOfTaskById(int id)
        {
            TaskItem task = _context.TaskItems
                .Include(t => t.Items)
                .FirstOrDefault(t => t.Id == id);

            return task?.Items;
        }

        public Item AddItemToTask(ItemDto dto)
        {
            TaskItem taskItem = _context.TaskItems
                .Include(t => t.Items)
                .FirstOrDefault(t => t.Id == dto.TaskId);

            Item newItem = new Item
            {
                Names = dto.Names,
                Colors = dto.Colors,
                AnyColor = dto.AnyColor,
                Size = dto.Size,
                Category = dto.Category
            };

            taskItem.Items.Add(newItem);

            _context.TaskItems.Update(taskItem);
            _context.SaveChanges();

            return newItem;
        }

        public bool DeleteItemById(int id)
        {
            Item item = _context.Items.FirstOrDefault(i => i.Id == id);

            _context.Items.Remove(item);
            _context.SaveChanges();

            return item != null;
        }

        public bool DeleteTask(int id)
        {
            TaskItem taskToDelete = _context.TaskItems
                .Include(t => t.Items)
                .FirstOrDefault(t => t.Id == id);

            foreach (var item in taskToDelete.Items)
            {
                _context.Items.Remove(item);
            }

            _context.TaskItems.Remove(taskToDelete);
            _context.SaveChanges();

            return taskToDelete != null;
        }

        public bool EditTask(TaskItem taskItem)
        {
            TaskItem existingTaskItem = _context.TaskItems.FirstOrDefault(t => t.Id == taskItem.Id);

            if (existingTaskItem == null)
            {
                return false;
            }

            existingTaskItem.Name = taskItem.Name;
            existingTaskItem.AddressId = taskItem.AddressId;
            existingTaskItem.FillAdress = taskItem.FillAdress;
            existingTaskItem.Hour = taskItem.Hour;
            existingTaskItem.Minute = taskItem.Minute;
            existingTaskItem.OnlyWithEmptyBasket = taskItem.OnlyWithEmptyBasket;
            existingTaskItem.Second = taskItem.Second;
            existingTaskItem.UseTimer = taskItem.UseTimer;
            existingTaskItem.CardId = taskItem.CardId;
            existingTaskItem.RefreshInterval = taskItem.RefreshInterval;
            existingTaskItem.Delay = taskItem.Delay;

            _context.TaskItems.Update(existingTaskItem);
            _context.SaveChanges();

            return true;
        }
    }
}
