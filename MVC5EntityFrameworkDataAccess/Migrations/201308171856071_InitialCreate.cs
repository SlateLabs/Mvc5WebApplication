namespace MVC5EntityFrameworkDataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        CustomerID = c.Guid(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        EmailAddress = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        Region = c.String(),
                        PostalCode = c.String(),
                        Country = c.String(),
                        PhoneNumber = c.String(),
                        CreditCardNumber = c.String(),
                        PaymentTypeID = c.Guid(nullable: false),
                        CreditCardExpirationDate = c.DateTime(),
                        CreditCardSecurityCode = c.String(),
                        CreditLimit = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DateApproved = c.DateTime(),
                        ApprovalStatus = c.Int(nullable: false),
                        DateCreated = c.DateTime(nullable: false),
                        DateUpdated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.CustomerID);
            
            CreateTable(
                "dbo.PaymentTypes",
                c => new
                    {
                        PaymentTypeID = c.Guid(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.PaymentTypeID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PaymentTypes");
            DropTable("dbo.Customers");
        }
    }
}
