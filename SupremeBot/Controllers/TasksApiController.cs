using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupremeBot.Data;

namespace SupremeBot.Controllers
{

    [ApiController]
    public class TasksApiController : ControllerBase
    {
        private readonly DataContext _context;
        private static int currentId;

        public TasksApiController(DataContext context)
        {
            _context = context;
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
            var task = _context.TaskItems.Find(currentId);
            if (task == null)
                return "not found";
            return task;
        }

        [Route("api/Tasks/Test")]
        [HttpGet]
        public object Test()
        {
            return new { cos = "coss" };
        }
    }
}