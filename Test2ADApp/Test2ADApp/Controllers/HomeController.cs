using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Test2ADApp.Models;
using Microsoft.Extensions.Configuration;

namespace Test2ADApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            var claims = ((ClaimsIdentity)User.Identity).Claims;
            
            return View(claims);
        }


        [Authorize("Admin")]
        public IActionResult About()
        {


            ViewData["Message"] = "Your application description page.";

            return View();
        }

        [Authorize("Testi")]
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [AllowAnonymous]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
