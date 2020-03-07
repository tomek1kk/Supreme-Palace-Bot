using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SupremeBot.Models;
using SupremeBot.Models.Dto;

namespace SupremeBot.Data
{
    public interface ITaskRepository
    {
        TaskItem CreateTaskFromDto(TaskItemDto dto);

        TaskItem GetTaskById(int id);

        IEnumerable<Item> GetItemsOfTaskById(int id);

        Item AddItemToTask(ItemDto dto);

        bool DeleteItemById(int id);

        bool DeleteTask(int id);
    }
}
