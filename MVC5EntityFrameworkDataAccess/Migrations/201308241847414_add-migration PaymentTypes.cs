namespace MVC5EntityFrameworkDataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addmigrationPaymentTypes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PaymentTypes", "RequiresCreditCard", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PaymentTypes", "RequiresCreditCard");
        }
    }
}
