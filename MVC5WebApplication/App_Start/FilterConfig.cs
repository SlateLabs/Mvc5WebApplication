using System.Web;
using System.Web.Mvc;
using MVC5WebApplication.Filters;

namespace MVC5WebApplication
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());                
        }
    }
}
