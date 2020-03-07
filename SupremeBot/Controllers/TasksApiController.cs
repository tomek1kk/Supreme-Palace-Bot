using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SupremeBot.Data;
using SupremeBot.Models;

namespace SupremeBot.Controllers
{
    [EnableCors]
    [ApiController]
    public class TasksApiController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITaskRepository taskRepository;
        private static int currentId;

        public TasksApiController(DataContext context, ITaskRepository taskRepository)
        {
            _context = context;
            this.taskRepository = taskRepository;
        }

        public static void SetCurrentId(int id)
        {
            currentId = id;
        }

        [Route("api/Tasks/Get/{id}")]
        [HttpGet]
        public object Get(int id)
        {
            var task = _context.TaskItems.Find(id);

            return task;
        }

        [Route("api/Tasks/GetCurrentTask")]
        [HttpGet]
        public object GetCurrentTask()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            TaskItem task = _context.TaskItems.Find(currentId);
            if (task == null)
                return "not found";

            var itemsToBuy = taskRepository.GetItemsOfTaskById(task.Id).Select(item => new
            {
                names = item.Names,
                anyColor = item.AnyColor,
                colors = item.Colors,
                size = Enum.GetName(typeof(Sizes), item.Size),
                category = Enum.GetName(typeof(Categories), item.Category)
            });

            object taskObject = new
            {
                name = task.Name,
                address = _context.Addresses.Find(task.AddressId),
                card = _context.Cards.Find(task.CardId),
                delay = task.Delay,
                fillAddress = task.FillAdress,
                onlyWithEmptyBasket = task.OnlyWithEmptyBasket,
                refreshInterval = task.RefreshInterval,
                items = itemsToBuy
        };
            return taskObject;
        }
    }
}