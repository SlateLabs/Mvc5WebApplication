using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MVC5WebApplication.ViewModels;
using MVC5WebApplication.ViewModels.Customers;
using MVC5WebApplication.Helpers;
using MVC5ApplicationService;
using MVC5Models;
using MVC5EntityFrameworkDataAccess;
using MVC5DataServiceInterface;
using MVC5WebApplication.ViewModels.SeedData;
using MVC5SeedData;


namespace MVC5WebApplication.Controllers
{
    [RoutePrefix("api/SeedData")]
    public class SeedDataApiController : ApiController
    {

        ICustomerDataService customerDataService;       

        /// <summary>
        /// Constructor with Dependency Injection using Ninject
        /// </summary>
        /// <param name="dataService"></param>
        public SeedDataApiController(ICustomerDataService dataService)
        {
            customerDataService = dataService;           
        }

        /// <summary>
        /// Seed Data
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("Seed")]
        public HttpResponseMessage SeedData(HttpRequestMessage request)
        {
 
            TransactionalInformation transaction;

            SeedDataViewModel seedDataViewModel = new SeedDataViewModel();

            SeedData seedData = new SeedData();
            List<Customer> customers = seedData.LoadDataSet(out transaction);
            if (transaction.ReturnStatus==false)
            {
                seedDataViewModel.ReturnStatus = false;
                seedDataViewModel.ReturnMessage = transaction.ReturnMessage;
                var badresponse = Request.CreateResponse<SeedDataViewModel>(HttpStatusCode.BadRequest, seedDataViewModel);
                return badresponse;
            }

            long startTickCount = System.Environment.TickCount;

            CustomerApplicationService customerApplicationService = new CustomerApplicationService(customerDataService);
            customerApplicationService.DeleteAllCustomers(out transaction);
            if (transaction.ReturnStatus==false)
            {
                seedDataViewModel.ReturnStatus = false;
                seedDataViewModel.ReturnMessage = transaction.ReturnMessage;
                var badresponse = Request.CreateResponse<SeedDataViewModel>(HttpStatusCode.BadRequest, seedDataViewModel);
                return badresponse;
            }
             
            foreach (Customer customer in customers)
            {
                customerApplicationService.CreateCustomer(customer, out transaction);
                if (transaction.ReturnStatus==false)
                {
                    transaction.ReturnMessage.Add("for " + customer.LastName + "," + customer.FirstName);
                    seedDataViewModel.ReturnStatus = false;
                    seedDataViewModel.ReturnMessage = transaction.ReturnMessage;
                    var badresponse = Request.CreateResponse<SeedDataViewModel>(HttpStatusCode.BadRequest, seedDataViewModel);
                    return badresponse;
                }
            }
                
            long endTickCount = System.Environment.TickCount;
            decimal ticks = ((endTickCount - startTickCount)/1000)/60;
       
            List<String> returnMessage = new List<String>();
            returnMessage.Add(customers.Count.ToString() + " customers created in " + ticks.ToString() + " minutes");

            seedDataViewModel.ReturnStatus = true;
            seedDataViewModel.ReturnMessage = returnMessage;
          
            var response = Request.CreateResponse<SeedDataViewModel>(HttpStatusCode.OK, seedDataViewModel);
            return response;          

        }

    }
}
