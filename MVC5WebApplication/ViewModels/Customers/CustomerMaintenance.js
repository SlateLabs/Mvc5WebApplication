﻿$(document).ready(function () {

    InitializeCustomerMaintenanceViewModel();
 
    GetCustomerInformation();
  

});

function CustomerMaintenanceViewModel() {

    this.CustomerID = ko.observable("");
    this.FirstName = ko.observable("");
    this.LastName = ko.observable("");
    this.EmailAddress = ko.observable("");
    this.Address = ko.observable("");
    this.City = ko.observable("");
    this.Region = ko.observable("");
    this.PostalCode = ko.observable("");
    this.Country = ko.observable("");
    this.PhoneNumber = ko.observable("");
    this.CreditCardNumber = ko.observable(""); 
    this.PaymentTypes = ko.observableArray();
    this.PaymentTypeID = ko.observable("");
    this.PaymentTypeDescription = ko.observable("");

    this.CreditCardExpirationDate = ko.observable("");
    this.CreditCardSecurityCode = ko.observable("");
    this.CreditLimit = ko.observable("");

    this.OriginalFirstName = ko.observable("");
    this.OriginalLastName = ko.observable("");
    this.OriginalEmailAddress = ko.observable("");
    this.OriginalAddress = ko.observable("");
    this.OriginalCity = ko.observable("");
    this.OriginalRegion = ko.observable("");
    this.OriginalPostalCode = ko.observable("");
    this.OriginalCountry = ko.observable("");
    this.OriginalPhoneNumber = ko.observable("");
    this.OriginalCreditCardNumber = ko.observable("");
    this.OriginalPaymentTypeID = ko.observable("");
    this.OriginalPaymentTypeDescription = ko.observable("");
    this.OriginalCreditCardExpirationDate = ko.observable("");
    this.OriginalCreditCardSecurityCode = ko.observable("");
    this.OriginalCreditLimit = ko.observable("");

    this.MessageBox = ko.observable("");

    this.EnableCreateButton = ko.observable(true);
    this.EnableUpdateButton = ko.observable(false);
    this.EnableCancelChangesButton = ko.observable(false);
    this.EnableEditButton = ko.observable(false);
    this.EnableCreateAnotherCustomerButton = ko.observable(false);
    this.EnableApproveButton = ko.observable(false);
    this.ChangesMade = ko.observable(false);

    this.DisplayMode = ko.observable(false);
    this.EditMode = ko.observable(true);
    this.DisplayContent = ko.observable(true);

    this.UpdateCustomer = function () {
        UpdateCustomer();
    };

    this.CreateCustomer = function () {
        CreateCustomer();
    };

    this.EditCustomer = function () {
        EditCustomer();
    };

    this.EnableCreateAnotherCustomer = function () {
        CreateAnotherCustomer();
    }

    this.CancelChanges = function () {
        CancelChanges();
    };

    this.DisableSubscriptions = ko.observable(false);

}

function InitializeCustomerMaintenanceViewModel() {

    customerMaintenanceViewModel = new CustomerMaintenanceViewModel();
    ko.applyBindings(customerMaintenanceViewModel);
    SubscribeToChanges();
   
    customerMaintenanceViewModel.CustomerID(customerID);

}

function SubscribeToChanges() {

    customerMaintenanceViewModel.FirstName.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.LastName.subscribe(function () { ChangesMade(); });

    customerMaintenanceViewModel.Address.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.City.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.Region.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.PostalCode.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.Country.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.PhoneNumber.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.EmailAddress.subscribe(function () { ChangesMade(); });

    customerMaintenanceViewModel.CreditCardNumber.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.PaymentTypeID.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.CreditCardExpirationDate.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.CreditCardSecurityCode.subscribe(function () { ChangesMade(); });
    customerMaintenanceViewModel.CreditLimit.subscribe(function () { ChangesMade(); });

}

function ChangesMade() {

    if (customerMaintenanceViewModel.DisableSubscriptions() == true) return;

    customerMaintenanceViewModel.ChangesMade(true);
    customerMaintenanceViewModel.EnableCancelChangesButton(true);

}

function CreateCustomer() {
  
    MVC5WebApplication.DisplayAjax();

    var customer = new PopulateCustomerInformation();

    setTimeout(function() {

        var jqxhr = $.post("/api/customers/create", customer, function (response) {
            CreateCustomerCompleted(response);
        },
        "json")
         .fail(function (response) {
             RequestFailed(response);
         });
    }, 1000);


}

function UpdateCustomer() {
   
    MVC5WebApplication.DisplayAjax();

    var customer = new PopulateCustomerInformation();

    setTimeout(function() {

        var jqxhr = $.post("/api/customers/update", customer, function (response) {
            UpdateCustomerCompleted(response);
        },
        "json")
         .fail(function (response) {
             RequestFailed(response);
         });

    }, 1000);


}

function EditCustomer() {

    customerMaintenanceViewModel.EnableCreateButton(false);
    customerMaintenanceViewModel.EnableUpdateButton(true);
    customerMaintenanceViewModel.EnableEditButton(false);
    customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(false);
    customerMaintenanceViewModel.EnableCancelChangesButton(true);

    customerMaintenanceViewModel.DisplayMode(false);
    customerMaintenanceViewModel.EditMode(true);

}

function CreateAnotherCustomer() {

    customerMaintenanceViewModel.EnableCreateButton(true);
    customerMaintenanceViewModel.EnableUpdateButton(false);
    customerMaintenanceViewModel.EnableEditButton(false);
    customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(false);
    customerMaintenanceViewModel.EnableCancelChangesButton(false);

    customerMaintenanceViewModel.DisplayMode(false);
    customerMaintenanceViewModel.EditMode(true);
    
    InitializeCustomerInformation();

}

function InitializeCustomerInformation()
{
    customerMaintenanceViewModel.DisableSubscriptions(true);
    setTimeout("BeginInitializeCustomerInformation()", 100);
}

function BeginInitializeCustomerInformation()
{
    customerMaintenanceViewModel.CustomerID(MVC5WebApplication.SetEmptyGuid());
    customerMaintenanceViewModel.FirstName("");
    customerMaintenanceViewModel.LastName("");
    customerMaintenanceViewModel.Address("");
    customerMaintenanceViewModel.City("");
    customerMaintenanceViewModel.Region("");
    customerMaintenanceViewModel.PostalCode("");
    customerMaintenanceViewModel.Country("");
    customerMaintenanceViewModel.PhoneNumber("");
    customerMaintenanceViewModel.EmailAddress("");
    customerMaintenanceViewModel.CreditCardSecurityCode("");
    customerMaintenanceViewModel.CreditCardNumber("");
    customerMaintenanceViewModel.PaymentTypeID("");
    customerMaintenanceViewModel.CreditCardExpirationDate("");
    customerMaintenanceViewModel.CreditLimit("");

    UpdateOriginalValues();

    customerMaintenanceViewModel.DisableSubscriptions(false);

}

function UpdateCustomerCompleted(response) {

    MVC5WebApplication.ClearValidationErrors();

    customerMaintenanceViewModel.CustomerID(response.Customer.CustomerID);
    customerMaintenanceViewModel.MessageBox("");
    customerMaintenanceViewModel.MessageBox(MVC5WebApplication.RenderInformationalMessage(response.ReturnMessage));
    customerMaintenanceViewModel.EnableCreateButton(false);
    customerMaintenanceViewModel.EnableUpdateButton(false);
    customerMaintenanceViewModel.EnableEditButton(true);
    customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(true);
    customerMaintenanceViewModel.EnableCancelChangesButton(false);

    customerMaintenanceViewModel.DisplayMode(true);
    customerMaintenanceViewModel.EditMode(false);

    UpdateOriginalValues();
  
    MVC5WebApplication.HideAjax();


}

function CreateCustomerCompleted(response) {

    MVC5WebApplication.ClearValidationErrors();

    customerMaintenanceViewModel.CustomerID(response.Customer.CustomerID);
    customerMaintenanceViewModel.MessageBox("");
    customerMaintenanceViewModel.MessageBox(MVC5WebApplication.RenderInformationalMessage(response.ReturnMessage));
    customerMaintenanceViewModel.EnableCreateButton(false);
    customerMaintenanceViewModel.EnableUpdateButton(false);
    customerMaintenanceViewModel.EnableEditButton(true);
    customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(true);
    customerMaintenanceViewModel.EnableCancelChangesButton(false);

    customerMaintenanceViewModel.DisplayMode(true);
    customerMaintenanceViewModel.EditMode(false);

    UpdateOriginalValues();
 
    MVC5WebApplication.HideAjax();

}

function RequestFailed(response) {

    MVC5WebApplication.ClearValidationErrors();
    var jsonResponse = jsonParse(response.responseText);
  
    customerMaintenanceViewModel.MessageBox("");
    customerMaintenanceViewModel.MessageBox(MVC5WebApplication.RenderErrorMessage(jsonResponse.ReturnMessage));
    MVC5WebApplication.RenderValidationErrors(jsonResponse.ValidationErrors);
   
    MVC5WebApplication.HideAjax();

}

function PopulateCustomerInformation() {

    var customer = new function () { };

    if (customerMaintenanceViewModel.CustomerID() != "") {
        customer.CustomerID = customerMaintenanceViewModel.CustomerID();
    }

    customer.FirstName = customerMaintenanceViewModel.FirstName();
    customer.LastName = customerMaintenanceViewModel.LastName();
    customer.Address = customerMaintenanceViewModel.Address();
    customer.City = customerMaintenanceViewModel.City();
    customer.Region = customerMaintenanceViewModel.Region();
    customer.PostalCode = customerMaintenanceViewModel.PostalCode();
    customer.Country = customerMaintenanceViewModel.Country();
    customer.PhoneNumber = customerMaintenanceViewModel.PhoneNumber();
    customer.EmailAddress = customerMaintenanceViewModel.EmailAddress();
    customer.CreditCardSecurityCode = customerMaintenanceViewModel.CreditCardSecurityCode();
    customer.CreditCardNumber = customerMaintenanceViewModel.CreditCardNumber();
    customer.PaymentTypeID = customerMaintenanceViewModel.PaymentTypeID();
    customer.CreditCardExpirationDate = customerMaintenanceViewModel.CreditCardExpirationDate();
    customer.CreditLimit = customerMaintenanceViewModel.CreditLimit();

    return customer;

}

function CancelChanges() {

    customerMaintenanceViewModel.DisableSubscriptions(true);
    setTimeout("BeginCancelChanges()", 100);
 
}

function BeginCancelChanges()
{
    if (MVC5WebApplication.IsGuidEmpty(customerMaintenanceViewModel.CustomerID()) == true) {

        customerMaintenanceViewModel.EnableCreateButton(true);
        customerMaintenanceViewModel.EnableUpdateButton(false);
        customerMaintenanceViewModel.EnableEditButton(false);
        customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(false);

        customerMaintenanceViewModel.DisplayMode(false);
        customerMaintenanceViewModel.EditMode(true);

        ResetValues();

        customerMaintenanceViewModel.EnableCancelChangesButton(false);

        customerMaintenanceViewModel.DisableSubscriptions(false);

        return;

    }

    customerMaintenanceViewModel.EnableCreateButton(false);
    customerMaintenanceViewModel.EnableUpdateButton(false);
    customerMaintenanceViewModel.EnableEditButton(true);
    customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(true);

    customerMaintenanceViewModel.DisplayMode(true);
    customerMaintenanceViewModel.EditMode(false);

    ResetValues();

    customerMaintenanceViewModel.EnableCancelChangesButton(false);

    customerMaintenanceViewModel.DisableSubscriptions(false);

}

function UpdateOriginalValues() {

    if (!MVC5WebApplication.IsGuidEmpty(customerMaintenanceViewModel.PaymentTypeID())) {
        SetPaymentTypeDescription(customerMaintenanceViewModel.PaymentTypeID())
    }

    customerMaintenanceViewModel.OriginalFirstName(customerMaintenanceViewModel.FirstName());
    customerMaintenanceViewModel.OriginalLastName(customerMaintenanceViewModel.LastName());
    customerMaintenanceViewModel.OriginalAddress(customerMaintenanceViewModel.Address());
    customerMaintenanceViewModel.OriginalCity(customerMaintenanceViewModel.City());
    customerMaintenanceViewModel.OriginalRegion(customerMaintenanceViewModel.Region());
    customerMaintenanceViewModel.OriginalPostalCode(customerMaintenanceViewModel.PostalCode());
    customerMaintenanceViewModel.OriginalCountry(customerMaintenanceViewModel.Country());
    customerMaintenanceViewModel.OriginalPhoneNumber(customerMaintenanceViewModel.PhoneNumber());
    customerMaintenanceViewModel.OriginalEmailAddress(customerMaintenanceViewModel.EmailAddress());
    customerMaintenanceViewModel.OriginalCreditCardSecurityCode(customerMaintenanceViewModel.CreditCardSecurityCode());
    customerMaintenanceViewModel.OriginalCreditCardNumber(customerMaintenanceViewModel.CreditCardNumber());
    customerMaintenanceViewModel.OriginalPaymentTypeID(customerMaintenanceViewModel.PaymentTypeID());
    customerMaintenanceViewModel.OriginalPaymentTypeDescription(customerMaintenanceViewModel.PaymentTypeDescription());
    customerMaintenanceViewModel.OriginalCreditCardExpirationDate(customerMaintenanceViewModel.CreditCardExpirationDate());
    customerMaintenanceViewModel.OriginalCreditLimit(customerMaintenanceViewModel.CreditLimit());

 
}

function ResetValues() {

    customerMaintenanceViewModel.FirstName(customerMaintenanceViewModel.OriginalFirstName());
    customerMaintenanceViewModel.LastName(customerMaintenanceViewModel.OriginalLastName());
    customerMaintenanceViewModel.Address(customerMaintenanceViewModel.OriginalAddress());
    customerMaintenanceViewModel.City(customerMaintenanceViewModel.OriginalCity());
    customerMaintenanceViewModel.Region(customerMaintenanceViewModel.OriginalRegion());
    customerMaintenanceViewModel.PostalCode(customerMaintenanceViewModel.OriginalPostalCode());
    customerMaintenanceViewModel.Country(customerMaintenanceViewModel.OriginalCountry());
    customerMaintenanceViewModel.PhoneNumber(customerMaintenanceViewModel.OriginalPhoneNumber());
    customerMaintenanceViewModel.EmailAddress(customerMaintenanceViewModel.OriginalEmailAddress());
    customerMaintenanceViewModel.CreditCardSecurityCode(customerMaintenanceViewModel.OriginalCreditCardSecurityCode());
    customerMaintenanceViewModel.CreditCardNumber(customerMaintenanceViewModel.OriginalCreditCardNumber());
    customerMaintenanceViewModel.PaymentTypeID(customerMaintenanceViewModel.OriginalPaymentTypeID());
    customerMaintenanceViewModel.CreditCardExpirationDate(customerMaintenanceViewModel.OriginalCreditCardExpirationDate());
    customerMaintenanceViewModel.CreditLimit(customerMaintenanceViewModel.OriginalCreditLimit());

    if (!MVC5WebApplication.IsGuidEmpty(customerMaintenanceViewModel.PaymentTypeID())) {
        SetPaymentTypeDescription(customerMaintenanceViewModel.PaymentTypeID())
    }

}

function GetCustomerInformation()
{

    MVC5WebApplication.DisplayAjax();

    var customer = new function () { };
    customer.CustomerID = customerMaintenanceViewModel.CustomerID();

    setTimeout(function() {

        var jqxhr = $.get("/api/customers/GetCustomerMaintenanceInformation", customer, function (response) {
            GetCustomerCompleted(response);
        },
        "json")
         .fail(function (response) {
             RequestFailed(response);
         });
    }, 1000);

}

function SetPaymentTypeDescription(paymentTypeID)
{

    if (paymentTypeID == null) return;

    var description = Enumerable.From(customerMaintenanceViewModel.PaymentTypes())
    .Where(function (x) { return x.PaymentTypeID == paymentTypeID }).Select(function (x) { return x.Description }).First();

    customerMaintenanceViewModel.PaymentTypeDescription(description);

}

function GetCustomerCompleted(response) {

    customerMaintenanceViewModel.PaymentTypes(response.PaymentTypes);
  
    if (MVC5WebApplication.IsGuidEmpty(customerMaintenanceViewModel.CustomerID())==true)
    {
        customerMaintenanceViewModel.MessageBox("");
        customerMaintenanceViewModel.EnableCreateButton(true);
        customerMaintenanceViewModel.EnableUpdateButton(false);
        customerMaintenanceViewModel.EnableEditButton(false);
        customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(false);
        customerMaintenanceViewModel.EnableCancelChangesButton(false);

        customerMaintenanceViewModel.DisplayMode(false);
        customerMaintenanceViewModel.EditMode(true);

        MVC5WebApplication.HideAjax();

        return;
    }

    customerMaintenanceViewModel.FirstName(response.Customer.FirstName);
    customerMaintenanceViewModel.LastName(response.Customer.LastName);
    customerMaintenanceViewModel.Address(response.Customer.Address);
    customerMaintenanceViewModel.City(response.Customer.City);
    customerMaintenanceViewModel.Region(response.Customer.Region);
    customerMaintenanceViewModel.PostalCode(response.Customer.PostalCode);
    customerMaintenanceViewModel.Country(response.Customer.Country);
    customerMaintenanceViewModel.PhoneNumber(response.Customer.PhoneNumber);
    customerMaintenanceViewModel.EmailAddress(response.Customer.EmailAddress);
    customerMaintenanceViewModel.CreditCardSecurityCode(response.Customer.CreditCardSecurityCode);
    customerMaintenanceViewModel.CreditCardNumber(response.Customer.CreditCardNumber);
    customerMaintenanceViewModel.PaymentTypeID(response.Customer.PaymentTypeID);
    customerMaintenanceViewModel.CreditCardExpirationDate(MVC5WebApplication.FormatJsonDate(response.Customer.CreditCardExpirationDate));
    customerMaintenanceViewModel.CreditLimit(MVC5WebApplication.FormatCurrency(response.Customer.CreditLimit));
    
    customerMaintenanceViewModel.MessageBox("");
    customerMaintenanceViewModel.EnableCreateButton(false);
    customerMaintenanceViewModel.EnableUpdateButton(false);
    customerMaintenanceViewModel.EnableEditButton(true);
    customerMaintenanceViewModel.EnableCreateAnotherCustomerButton(true);
    customerMaintenanceViewModel.EnableCancelChangesButton(false);

    customerMaintenanceViewModel.DisplayMode(true);
    customerMaintenanceViewModel.EditMode(false);

    if (!MVC5WebApplication.IsGuidEmpty(customerMaintenanceViewModel.PaymentTypeID()))
    {
        SetPaymentTypeDescription(customerMaintenanceViewModel.PaymentTypeID())
    }

    UpdateOriginalValues();

    MVC5WebApplication.HideAjax();

}