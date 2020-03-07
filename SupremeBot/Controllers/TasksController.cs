using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SupremeBot.Data;
using SupremeBot.Models;
using SupremeBot.Models.Dto;

namespace SupremeBot.Controllers
{
    public class TasksController : Controller
    {
        private readonly DataContext _context;
        private ITaskRepository _taskRepository;

        public TasksController(DataContext context, ITaskRepository repo)
        {
            _context = context;
            _taskRepository = repo;
        }

        [Route("Tasks/Index")]
        [HttpGet]
        public IActionResult Index()
        {
            var items = _context.TaskItems.ToList();
            return View(items);
        }

        [Route("Tasks/CreateTask")]
        [HttpGet]
        public IActionResult CreateTask()
        {
            return View("CreateTask");
        }

        [HttpGet]
        [Route("Tasks/CreateTaskFromDto")]
        public IActionResult CreateTaskFromDto([FromBody]object dto)
        {

            return RedirectToAction("Index");
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

        [Route("tasks/CreateTask")]
        [HttpPost]
        public TaskItem CreateTask([FromBody] TaskItemDto data)
        {
            TaskItem taskItem = _taskRepository.CreateTaskFromDto(data);


            //return RedirectToAction("TaskDetails", new {id = taskItem.Id});'
            return taskItem;
        }

        [Route("tasks/TaskDetails/{id}")]
        [HttpGet]
        public IActionResult TaskDetails([FromRoute] int id)
        {
            TaskItem model = _taskRepository.GetTaskById(id);

            if (model != null)
            {
                return View("TaskDetails", model);
            }
            else
            {
                return NotFound();
            }
        }

        [Route("tasks/ItemsOfTask/{id}")]
        [HttpGet]
        public IEnumerable<Item> ItemsOfTask(int id)
        {
            return _taskRepository.GetItemsOfTaskById(id);
        }

        [Route("tasks/AddItemToTask")]
        [HttpPost]
        public Item AddItemToTask([FromBody]ItemDto dto)
        {
            return _taskRepository.AddItemToTask(dto);
        }

        [Route("tasks/DeleteItem")]
        [HttpDelete]
        public IActionResult DeleteItem([FromBody]int id)
        {
            _taskRepository.DeleteItemById(id);

            return Ok();
        }

        //[Route("tasks/CreateTask")]
        //[HttpPost]
        //public IActionResult CreateTask([FromBody] JObject data)
        //{
        //    string taskName = data["name"].ToObject<string>();
        //    //string taskName = "Task name";
        //    bool anyColor = data["anyColor"].ToObject<bool>();
        //    bool useTimer = data["useTimer"].ToObject<bool>();
        //    bool onlyWithEmptyBasket = data["onlyWithEmptyBasket"].ToObject<bool>();
        //    bool fillAddress = data["fillAddress"].ToObject<bool>();
        //    int delay = data["delay"].ToObject<int>();
        //    int refreshInterval = data["refreshInterval"].ToObject<int>();
        //    int cardId = data["card"].ToObject<int>();
        //    int addressId = data["address"].ToObject<int>();
        //    string timeString = data["time"].ToObject<string>();
        //    var timeList = timeString.Split(':');
        //    int hour = Int32.Parse(timeList[0]);
        //    int minute = Int32.Parse(timeList[1]);
        //    int second = Int32.Parse(timeList[2]);
        //    List<JObject> itemsJson = data["items"].ToObject<List<JObject>>();
        //    int siteId = data["site"].ToObject<int>();

        //    var items = new List<Item>();

        //    foreach (var item in itemsJson)
        //    {
        //        Categories category = item["category"].ToObject<Categories>();
        //        Sizes size = item["size"].ToObject<Sizes>();
        //        var colors = item["colors"].ToObject<string>();
        //        var names = item["names"].ToObject<string>();

        //        var newItem = new Item()
        //        {
        //            Category = category, AnyColor = true, Colors = colors,
        //            Names = names, Size = size//, TaskId = task.Id
        //        };

        //        items.Add(newItem);
        //    }

        //    TaskItem task = new TaskItem()
        //    {
        //        Name = taskName,
        //        AnyColor = anyColor,
        //        Delay = delay,
        //        FillAdress = fillAddress,
        //        OnlyWithEmptyBasket = onlyWithEmptyBasket,
        //        RefreshInterval = refreshInterval,
        //        Items = items,
        //        UseTimer = useTimer,
        //        CardId = cardId,
        //        AddressId = addressId,
        //        Hour = hour,
        //        Minute = minute,
        //        Second = second,
        //        Site = siteId
        //    };

        //    _context.TaskItems.Add(task);

        //    _context.SaveChanges();

        //    return RedirectToAction("Index");
        //}

        [Route("tasks/Delete/{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            if(_taskRepository.DeleteTask(id))
            {
                return RedirectToAction("Index");
            }

            return NotFound();
        }

        public IActionResult Edit(int id)
        {
            TaskItem model = _context.TaskItems
                .Include(x => x.Card)
                .Include(x => x.Address)
                .Include(x => x.Items)
                .Include(x => x.Items)
                .FirstOrDefault(x => x.Id == id);

            return View(model);
        }

        [Route("tasks/EditTask")]
        [HttpPut]
        public IActionResult EditTask([FromBody] JObject data)
        {
            int Id = data["id"].ToObject<int>();

            string taskName = data["name"].ToObject<string>();
            //string taskName = "Task name";
            bool anyColor = data["anyColor"].ToObject<bool>();
            bool useTimer = data["useTimer"].ToObject<bool>();
            bool onlyWithEmptyBasket = data["onlyWithEmptyBasket"].ToObject<bool>();
            bool fillAddress = data["fillAddress"].ToObject<bool>();
            int delay = data["delay"].ToObject<int>();
            int refreshInterval = data["refreshInterval"].ToObject<int>();
            int cardId = data["card"].ToObject<int>();
            int addressId = data["address"].ToObject<int>();
            string timeString = data["time"].ToObject<string>();
            var timeList = timeString.Split(':');
            int hour = Int32.Parse(timeList[0]);
            int minute = Int32.Parse(timeList[1]);
            int second = Int32.Parse(timeList[2]);
            List<JObject> itemsJson = data["items"].ToObject<List<JObject>>();
            int siteId = data["site"].ToObject<int>();

            var items = new List<Item>();

            TaskItem existingTask = _context.TaskItems.FirstOrDefault(x => x.Id == Id);

            if (existingTask == null)
            {
                RedirectToAction("Index");
            }

            foreach (var item in itemsJson)
            {
                int itemId = item["id"].ToObject<int>();
                Categories category = item["category"].ToObject<Categories>();
                Sizes size = item["size"].ToObject<Sizes>();
                var colors = item["colors"].ToObject<string>();
                var names= item["names"].ToObject<string>();

                Item existingItem = _context.Items.FirstOrDefault(x => x.Id == itemId);
                if (existingItem == null)
                {
                    RedirectToAction("Index");
                }

                existingItem.Category = category;
                existingItem.AnyColor = true;
                existingItem.Colors = colors;
                existingItem.Names = names;
                existingItem.Size = size;

                items.Add(existingItem);

                _context.Items.Update(existingItem);
            }

            existingTask.Name = taskName;
            existingTask.Delay = delay;
            existingTask.FillAdress = fillAddress;
            existingTask.OnlyWithEmptyBasket = onlyWithEmptyBasket;
            existingTask.RefreshInterval = refreshInterval;
            existingTask.Items = items;
            existingTask.UseTimer = useTimer;
            existingTask.CardId = cardId;
            existingTask.AddressId = addressId;
            existingTask.Hour = hour;
            existingTask.Minute = minute;
            existingTask.Second = second;
            //existingTask.Site = siteId;

            _context.TaskItems.Update(existingTask);

            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Start(int id)
        {
            TasksApiController.SetCurrentId(id);
            return RedirectToAction("Index");
        }

        public IActionResult Details(int id)
        {
            var task = _context.TaskItems.Find(id);
            return View(task);
        }

    }
}