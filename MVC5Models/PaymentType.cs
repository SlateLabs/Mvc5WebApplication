using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC5Models
{
    public class PaymentType
    {
        public Guid PaymentTypeID { get; set; }
        public string Description { get; set; }
        public int RequiresCreditCard { get; set; }
    }
}
