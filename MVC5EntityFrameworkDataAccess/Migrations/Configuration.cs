namespace MVC5EntityFrameworkDataAccess.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using MVC5Models;

    internal sealed class Configuration : DbMigrationsConfiguration<MVC5EntityFrameworkDataAccess.MVC5Database>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "MVC5EntityFrameworkDataAccess.MVC5Database";
        }

        protected override void Seed(MVC5EntityFrameworkDataAccess.MVC5Database context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

           
            
        }
    }
}
