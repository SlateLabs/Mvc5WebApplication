using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC5WebApplication.ViewModels.Customers;
using MVC5WebApplication.Filters;
using System.Web.Security;

namespace MVC5WebApplication.Controllers
{
  
    public class CustomersController : Controller
    {
        /// <summary>
        /// Customer Maintenance
        /// </summary>
        /// <returns></returns>
        [AuthenicationAction]
        public ActionResult CustomerMaintenance()
        {         
            CustomerMaintenanceViewModel customerMaintenanceViewModel = new CustomerMaintenanceViewModel();
            customerMaintenanceViewModel.Customer.CustomerID = Guid.Empty;
            return View("CustomerMaintenance", customerMaintenanceViewModel);
        }

        /// <summary>
        /// Customer Inquiry
        /// </summary>
        /// <returns></returns>
        [AuthenicationAction]
        public ActionResult CustomerInquiry()
        {
            return View("CustomerInquiry");
        }
     
        /// <summary>
        /// Customer Login
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult CustomerLogin()
        {
            return View("CustomerLogin");           
        }

        /// <summary>
        /// Log off customer
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult CustomerLogoff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        /// <summary>
        /// Edit Customer
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        [AuthenicationAction]
        public ActionResult EditCustomer(string customerID)
        {
            CustomerMaintenanceViewModel customerMaintenanceViewModel = new CustomerMaintenanceViewModel();
            customerMaintenanceViewModel.Customer.CustomerID = new Guid(customerID);
            return View("CustomerMaintenance", customerMaintenanceViewModel);
        }

	}
}