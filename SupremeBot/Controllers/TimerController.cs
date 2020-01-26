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
using OpenQA.Selenium.Support.UI;
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

            @ViewBag.SiteUrl = url;

            return View(model);

            //return View(new TimerViewModel
            //{
            //    Hour = model.Hour,
            //    Minute = model.Minute,
            //    Second = model.Second,
            //    SiteUrl = url
            //});
        }

        //[Route("Timer/Execute/{taskId}")]
        //public async Task<IActionResult> Execute([FromRoute]int taskId)
        //{
        //    int siteId = _context.TaskItems.FirstOrDefault(x => x.Id == taskId).Site;

        //    new DriverManager().SetUpDriver(new ChromeConfig());
        //    var driver = new ChromeDriver();
        //    //List<String> tabs = new List<String>(driver.WindowHandles);
        //    //driver.SwitchTo().Window(tabs[0]); //switches to new tab

        //    //driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(20));
        //    //new WebDriverWait(driver, TimeSpan.FromSeconds(20)).Until(
        //    //    d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
        //    if (siteId == 2)
        //    {
        //        driver.Navigate().GoToUrl("https://shop.palaceskateboards.com/");
        //    }
        //    else if (siteId == 3)
        //    {
        //        driver.Navigate().GoToUrl("https://helascaps.com/");
        //    }
        //    IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
        //    string script = PrepareScript(siteId, taskId);

        //    try
        //    {
        //        js.ExecuteAsyncScript(script);
        //    }
        //    catch (Exception e)
        //    {

        //    }

        //    return RedirectToAction("Index", "Tasks");
        //}

        //private string PrepareScript(int siteId, int taskId)
        //{
        //    string path = "wwwroot/botScripts/";
        //    string data = String.Empty;
        //    string script = String.Empty;

        //    StringBuilder sb = new StringBuilder();

        //    switch (siteId)
        //    {
        //        case 1:
        //            data = PrepareSupremeData(taskId);
        //            break;
        //        case 2:
        //            data = PreparePalaceData(taskId);
        //            using (StreamReader streamReader = new StreamReader(path + "palace.txt", Encoding.UTF8))
        //            {
        //                script = streamReader.ReadToEnd();
        //            }
        //            break;
        //        case 3:
        //            data = PrepareHelasData(taskId);
        //            using (StreamReader streamReader = new StreamReader(path + "helas.txt", Encoding.UTF8))
        //            {
        //                script = streamReader.ReadToEnd();
        //            }
        //            break;
        //    }

        //    sb.Append(data);
        //    sb.Append(script);

        //    return sb.ToString();
        //}

        //private string PrepareHelasData(int taskId)
        //{
        //    return "";
        //}

        //private string PreparePalaceData(int taskId)
        //{
        //    TaskItem task = _context.TaskItems.Include(x => x.Items).FirstOrDefault(x => x.Id == taskId);
        //    //if(task == null)

        //    string category = task.Items[0].Category.ToString();
        //    string itemName = task.Items?[0].Names?[0].Name ?? "";
        //    string color = task.AnyColor ? "" : task.Items?[0].Colors?[0].Name;

        //    StringBuilder sb = new StringBuilder();
        //    sb.Append($"const category = '{category}';");
        //    sb.Append($"const ITEM_NAME = '{itemName}';");
        //    sb.Append($"const COLOR = '{color}';");

        //    string bilingInfo = PrepareBillingInfoPalace(taskId);
        //    sb.Append(bilingInfo);

        //    return sb.ToString();
        //}

        //private string PrepareSupremeData(int taskId)
        //{
        //    throw new NotImplementedException();
        //}

        //private string PrepareBillingInfoPalace(int taskId)
        //{
        //    Card card = _context.TaskItems.Include(x => x.Card).FirstOrDefault(x => x.Id == taskId).Card;
        //    Address address = _context.TaskItems.Include(x => x.AddressId).FirstOrDefault(x => x.Id == taskId).Address;
        //    string[] names = address.FullName.Split(' ');
        //    string firstName = names[0];
        //    string lastName = names.Length > 1 ? names[1] : names[0];

        //    StringBuilder sb = new StringBuilder();
        //    sb.Append("const BILLING_INFO = {");
        //    sb.Append($"\"first name\": \"{firstName}\",");
        //    sb.Append($"\"last name\": \"{lastName}\",");
        //    sb.Append($"\"email\": \"{address.Email}\",");
        //    sb.Append($"\"tel\": \"{address.PhoneNumber}\",");
        //    sb.Append($"\"address\": \"{address.Address1}\",");
        //    sb.Append($"\"city\": \"{address.City}\",");
        //    sb.Append($"\"postal code\": \"{address.PostCode}\",");
        //    sb.Append($"\"phone\": \"{address.PhoneNumber}\"");
        //    sb.Append("};");

        //    return sb.ToString();
        //}
    }
}