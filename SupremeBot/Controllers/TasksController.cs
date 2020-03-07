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

            return RedirectToAction("Index");
        }

        [Route("tasks/CreateTask")]
        [HttpPost]
        public TaskItem CreateTask([FromBody] TaskItemDto data)
        {
            TaskItem taskItem = _taskRepository.CreateTaskFromDto(data);

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

        [Route("tasks/Delete/{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            if(_taskRepository.DeleteTask(id))
            {
                return RedirectToAction("Index");
            }

            return NotFound();
        }

        [Route("tasks/EditTask")]
        [HttpPut]
        public IActionResult EditTask([FromBody] TaskItem taskItem)
        {
            _taskRepository.EditTask(taskItem);

            return Ok();
        }

        //public IActionResult Edit(int id)
        //{
        //    TaskItem model = _context.TaskItems
        //        .Include(x => x.Card)
        //        .Include(x => x.Address)
        //        .FirstOrDefault(x => x.Id == id);

        //    return View(model);
        //}

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