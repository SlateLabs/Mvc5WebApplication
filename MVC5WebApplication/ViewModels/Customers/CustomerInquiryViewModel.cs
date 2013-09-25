using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVC5Models;

namespace MVC5WebApplication.ViewModels.Customers
{
  
    public class CustomerInquiryViewModel : TransactionalInformation
    {
        public List<CustomerInquiry> Customers;       
    }

    public class CustomerInquiryDTO : DataGridPagingInformation
    {       
        public string FirstName { get; set; }
        public string LastName { get; set; }      
    }

}