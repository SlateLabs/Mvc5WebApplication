using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using MVC5Models;
using MVC5DataServiceInterface;

namespace MVC5EntityFrameworkDataAccess
{
    public class MVC5Database : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
     
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>().ToTable("dbo.Customers");
            modelBuilder.Entity<PaymentType>().ToTable("dbo.PaymentTypes");    
        }
    }

}
