using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.WebEncoders.Testing;
using SupremeBot.Data;
using SupremeBot.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;

namespace SupremeBot.Controllers
{
    public class TimerController : Controller
    {
        private readonly DataContext _context;
        public TimerController(DataContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(TimerParams model)
        {
            TasksApiController.SetCurrentId(model.TaskId);
            Site site = _context.Sites.FirstOrDefault(x => x.Id == model.Site);
            string url;
            if (site != null)
                url = site.SiteUrl;
            else
                url = "https://supremenewyork.com/shop/all";

            return View(model);

            //return View(new TimerViewModel
            //{
            //    Hour = model.Hour,
            //    Minute = model.Minute,
            //    Second = model.Second,
            //    SiteUrl = url
            //});
        }

        public async Task Execute(int taskId)
        {
            taskId = 2; //////////////////////////////////////////////////////////////////////////////////////////////////////

            int siteId = _context.TaskItems.FirstOrDefault(x => x.Id == taskId).Site;

            new DriverManager().SetUpDriver(new ChromeConfig());
            var driver = new ChromeDriver();

            driver.Navigate().GoToUrl("https://shop.palaceskateboards.com/");
            //driver.Title;
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

            //string script = PrepareScript(siteId, taskId);
            string script = PrepareScript(2, 2);


            js.ExecuteAsyncScript(script);
            //await js.ExecuteAsyncScript("console.log('dupa dupa');");

        }

        private string PrepareScript(int siteId, int taskId)
        {
            //string path = "/../../../wwwroot/botScripts/";
            string path = "wwwroot/botScripts/";
            string data = String.Empty;
            string script = String.Empty;

            StringBuilder sb = new StringBuilder();

            switch (siteId)
            {
                case 1:
                    data = PrepareSupremeData(taskId);
                    break;
                case 2:
                    data = PreparePalaceData(taskId);
                    using (StreamReader streamReader = new StreamReader(path + "palace.txt", Encoding.UTF8))
                    {
                        script = streamReader.ReadToEnd();
                    }
                    break;
                case 3:
                    data = PrepareHelasData(taskId);
                    break;
            }

            sb.Append(data);
            sb.Append(script);

            return sb.ToString();
        }

        private string PrepareHelasData(int taskId)
        {
            throw new NotImplementedException();
        }

        private string PreparePalaceData(int taskId)
        {
            TaskItem task = _context.TaskItems.Include(x => x.Items).FirstOrDefault(x => x.Id == taskId);
            //if(task == null)

            string category = task.Items[0].Category.ToString();
            string itemName = task.Items?[0].Names?[0].Name ?? "";
            string color = task.AnyColor ? "" : task.Items?[0].Colors?[0].Name;

            StringBuilder sb = new StringBuilder();
            sb.Append($"const category = '{category}';");
            sb.Append($"const ITEM_NAME = '{itemName}';");
            sb.Append($"const COLOR = '{color}';");

            string bilingInfo = PrepareBillingInfoPalace(taskId);
            sb.Append(bilingInfo);

            return sb.ToString();
        }

        private string PrepareSupremeData(int taskId)
        {
            throw new NotImplementedException();
        }

        private string PrepareBillingInfoPalace(int taskId)
        {
            Card card = _context.TaskItems.Include(x => x.Card).FirstOrDefault(x => x.Id == taskId).Card;
            Address address = _context.TaskItems.Include(x => x.Address).FirstOrDefault(x => x.Id == taskId).Address;
            string[] names = address.FullName.Split(' ');
            string firstName = names[0];
            string lastName = names.Length > 1 ? names[1] : names[0];

            StringBuilder sb = new StringBuilder();
            sb.Append("const BILLING_INFO = {");
            sb.Append($"\"first name\": \"{firstName}\",");
            sb.Append($"\"last name\": \"{lastName}\",");
            sb.Append($"\"email\": \"{address.Email}\",");
            sb.Append($"\"tel\": \"{address.PhoneNumber}\",");
            sb.Append($"\"address\": \"{address.Address1}\",");
            sb.Append($"\"city\": \"{address.City}\",");
            sb.Append($"\"postal code\": \"{address.PostCode}\",");
            sb.Append($"\"phone\": \"{address.PhoneNumber}\"");
            sb.Append("};");

            return sb.ToString();
        }
    }
}